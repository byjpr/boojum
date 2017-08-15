const Path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');

function View(path, data) {
  this.path = path;
  this.source = Path.join(this._theme.base, 'layout', path);
  this.data = data;

  this._precompile();
}

View.prototype.render = function(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};

  const data = this.data;
  const layout = data.hasOwnProperty('layout') ? data.layout : options.layout;
  const locals = this._buildLocals(options);
  const self = this;

  return this._compiled( this._bindHelpers(locals) )
    .then( (result) => {

      // If result is empty or there's no layout
      // return the return of this._compiled promise
      if (result == null || !layout) { return result; }

      // Find the correct layout for this view
      const layoutView = self._resolveLayout(layout);

      // If `layoutView` is falsy then we don't need to render a layout
      if (!layoutView) { return result; }

      // Set the default options for layout
      // these will be overridden by locals constant
      const layoutLocalsDefault = {
        body: result,
        layout: false,
      };

      // var1, var2, var3
      // var1: Empty object that var2 and var3 will be merged into;
      // var2: Local - ;
      // var3: Default object - ;
      const layoutLocals = _.assign({}, locals, layoutLocalsDefault);

      // Pass locals and callback to render
      return layoutView.render(layoutLocals, callback);

    }).asCallback(callback);
};

View.prototype.renderSync = function(options) {
  options = options || {};

  const data = this.data;
  const layout = data.hasOwnProperty('layout') ? data.layout : options.layout;
  const locals = this._buildLocals(options);
  const result = this._compiledSync(this._bindHelpers(locals));

  // If result is empty or there's no layout
  // return the return of this._compiled promise
  if (result == null || !layout) { return result; }

  // Find the correct layout for this view
  const layoutView = this._resolveLayout(layout);

  // If `layoutView` is falsy then we don't need to render a layout
  if (!layoutView) { return result; }

  // Set the default options for layout
  // these will be overridden by locals constant
  const layoutLocalsDefault = {
    body: result,
    layout: false,
  };

  // var1, var2, var3
  // var1: Empty object that var2 and var3 will be merged into;
  // var2: Local - ;
  // var3: Default object - ;
  const layoutLocals = _.assign({}, locals, layoutLocalsDefault);

  return layoutView.renderSync(layoutLocals);
};

View.prototype._buildLocals = function(locals) {

  // Drop everything that has a key of layout and _content
  const omit = _.omit(this.data, ['layout', '_content']);

  const obj = {
    filename: this.source,
  };

  return _.assignIn({}, locals, omit, obj);

};

View.prototype._bindHelpers = function(locals) {
  const helpers = this._helper.list();
  const keys = Object.keys(helpers);
  let key = '';

  for (let i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    locals[key] = _.bind(helpers[key], locals);
  }

  return locals;
};

View.prototype._resolveLayout = function(name) {
  // Relative path
  const layoutPath = Path.join(Path.dirname(this.path), name);
  let layoutView = this._theme.getView(layoutPath);

  if (layoutView && layoutView.source !== this.source) { return layoutView; }

  // Absolute path
  layoutView = this._theme.getView(name);
  if (layoutView && layoutView.source !== this.source) { return layoutView; }
};

View.prototype._precompile = function() {
  const render = this._render; // App Render Controller
  const ctx = render.context; // Use context of render controller
  const ext = Path.extname(this.path); // Extention
  const renderer = render.getRenderer(ext); // Get the renderer of this extention

  const data = {
    path: this.source,
    text: this.data._content,
  };

  function buildFilterArguments(result) {
    const output = render.getOutput(ext) || ext;
    return [
      `after_render:${output}`,
      result,
      {
        context: ctx,
        args: [data],
      },
    ];
  }

  // Check if renderer is truthy and
  // renderer.compile is a function
  if (renderer && typeof renderer.compile === 'function') {
    const compiled = renderer.compile(data);

    this._compiledSync = function(locals) {
      const result = compiled(locals);
      return ctx.execFilterSync(...buildFilterArguments(result));
    };

    this._compiled = function(locals) {
      return Promise.resolve(compiled(locals))
        .then((result) => {
          return ctx.execFilter(...buildFilterArguments(result));
        });
    };
  } else {
    this._compiledSync = function(locals) {
      return render.renderSync(data, locals);
    };

    this._compiled = function(locals) {
      return render.render(data, locals);
    };
  }
};

module.exports = View;
