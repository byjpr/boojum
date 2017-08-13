

const pathFn = require('path');
const _ = require('lodash');
const Promise = require('bluebird');

function View(path, data) {
  this.path = path;
  this.source = pathFn.join(this._theme.base, 'layout', path);
  this.data = typeof data === 'string' ? data : data;

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

  return this._compiled(this._bindHelpers(locals)).then((result) => {
    if (result == null || !layout) { return result; }

    const layoutView = self._resolveLayout(layout);
    if (!layoutView) { return result; }

    const layoutLocals = _.assign({}, locals, {
      body: result,
      layout: false,
    });

    return layoutView.render(layoutLocals, callback);
  }).asCallback(callback);
};

View.prototype.renderSync = function(options) {
  options = options || {};

  const data = this.data;
  const layout = data.hasOwnProperty('layout') ? data.layout : options.layout;
  const locals = this._buildLocals(options);
  const result = this._compiledSync(this._bindHelpers(locals));

  if (result == null || !layout) { return result; }

  const layoutView = this._resolveLayout(layout);
  if (!layoutView) { return result; }

  const layoutLocals = _.assign({}, locals, {
    body: result,
    layout: false,
  });

  return layoutView.renderSync(layoutLocals);
};

View.prototype._buildLocals = function(locals) {
  return _.assignIn({}, locals, _.omit(this.data, ['layout', '_content']), {
    filename: this.source,
  });
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
  const layoutPath = pathFn.join(pathFn.dirname(this.path), name);
  let layoutView = this._theme.getView(layoutPath);

  if (layoutView && layoutView.source !== this.source) { return layoutView; }

  // Absolute path
  layoutView = this._theme.getView(name);
  if (layoutView && layoutView.source !== this.source) { return layoutView; }
};

View.prototype._precompile = function() {
  const render = this._render; // App Render Controller
  const ctx = render.context; // Use context of render controller
  const ext = pathFn.extname(this.path); // Extention
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

  if (renderer && typeof renderer.compile === 'function') { // Check if renderer is truthy and renderer.compile is a function
    const compiled = renderer.compile(data); // run the compile

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
