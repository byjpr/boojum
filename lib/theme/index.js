

import Path from 'path';
import util from 'util';
import View from './view';

function Theme(context) {
  this.config = {}; // Active Theme Config

  this.views = {}; // Active Theme Views

  this.processors = [
    require('./processors/config'),
    require('./processors/source'),
    require('./processors/view'),
  ]; // Processors

  const _View = this.View = function(path, data) {
    View.call(this, path, data);
  };

  util.inherits(_View, View);

  _View.prototype._theme = this;
  _View.prototype._render = context.render;
  _View.prototype._helper = context.extend.helper;
}

// Return the View Processor from the extention
Theme.prototype.getView = function(path) {
  // Replace backslashes on Windows
  path = Path.replace(/\\/g, '/');

  const extname = Path.extname(path);
  const name = path.substring(0, path.length - extname.length);
  const views = this.views[name];

  if (!views) { return; }

  if (extname) {
    return views[extname];
  }

  return views[Object.keys(views)[0]];
};

Theme.prototype.setView = function(path, data) {
  const extname = Path.extname(path);
  const name = path.substring(0, path.length - extname.length);
  const views = this.views[name] = this.views[name] || {};

  views[extname] = new this.View(path, data);
};

Theme.prototype.removeView = function(path) {
  const extname = Path.extname(path);
  const name = path.substring(0, path.length - extname.length);
  const views = this.views[name];

  if (!views) { return; }

  delete views[extname];
};
