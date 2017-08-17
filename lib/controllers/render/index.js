import Path from 'path';
import Promise from 'bluebird';
import fs from 'hexo-fs';

function getExtname(str) {
  if (typeof str !== 'string') { return ''; }

  const extname = Path.extname(str);
  return extname[0] === '.' ? extname.slice(1) : extname;
}

function Render(context) {
  this.context = context;
  this.renderer = context.register.renderer;
}

Render.prototype.isRenderable = function(path) {
  return this.renderer.isRenderable(path);
};

Render.prototype.isRenderableSync = function(path) {
  return this.renderer.isRenderableSync(path);
};

Render.prototype.getOutput = function(path) {
  return this.renderer.getOutput(path);
};

Render.prototype.getRenderer = function(ext, sync) {
  return this.renderer.get(ext, sync);
};

Render.prototype.getRendererSync = function(ext) {
  return this.getRenderer(ext, true);
};

Render.prototype.render = function(data, options) {
  const ctx = this.context;
  const self = this;
  let ext = '';

  return new Promise((resolve, reject) => {
    if (!data) { return reject(new TypeError('No input file or string!')); }
    if (data.text != null) { return resolve(data.text); }
    if (!data.path) { return reject(new TypeError('No input file or string!')); }

    return fs.readFile(data.path).then(resolve, reject);
  }).then((text) => {
    data.text = text;
    ext = data.engine || getExtname(data.path);

    if (!ext || !self.isRenderable(ext)) { return text; }

    const renderer = self.getRenderer(ext);
    return renderer.call(ctx, data, options);
  }).then((result) => {
    result = toString(result, data);
    if (data.onRenderEnd) {
      return data.onRenderEnd(result);
    }

    return result;
  });
};

Render.prototype.renderSync = function(data, options) {
  if (!data) { throw new TypeError('No input file or string!'); }

  options = options || {};

  const ctx = this.context;

  if (data.text == null) {
    if (!data.path) { throw new TypeError('No input file or string!'); }
    data.text = fs.readFileSync(data.path);
  }

  if (data.text == null) { throw new TypeError('No input file or string!'); }

  const ext = data.engine || getExtname(data.path);
  let result;

  if (ext && this.isRenderableSync(ext)) {
    const renderer = this.getRendererSync(ext);
    result = renderer.call(ctx, data, options);
  } else {
    result = data.text;
  }

  result = toString(result, data);

  if (data.onRenderEnd) {
    result = data.onRenderEnd(result);
  }

  return result;
};

function toString(result, options) {
  if (!options.hasOwnProperty('toString') || typeof result === 'string') { return result; }

  if (typeof options.toString === 'function') {
    return options.toString(result);
  } else if (typeof result === 'object') {
    return JSON.stringify(result);
  } else if (result.toString) {
    return result.toString();
  }

  return result;
}

export default Render;
