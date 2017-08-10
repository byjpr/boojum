'use strict';

import Path from 'path'
import View from './view'

function Theme(context) {
    this.config = {} // Active Theme Config

    this.views = {} // Active Theme Views

    this.processors = [
      require('./processors/config'),
      require('./processors/source'),
      require('./processors/view')
    ] // Processors

    var _View = this.View = function(path, data) {
      View.call(this, path, data);
    }

    util.inherits(_View, View);

    _View.prototype._theme = this;
    _View.prototype._render = context.render;
    _View.prototype._helper = context.extend.helper;
}

// Return the View Processor from the extention
Theme.prototype.getView = function(path) {
  // Replace backslashes on Windows
  path = Path.replace(/\\/g, '/');

  var extname = Path.extname(path);
  var name = path.substring(0, path.length - extname.length);
  var views = this.views[name];

  if (!views) return;

  if (extname) {
    return views[extname];
  }

  return views[Object.keys(views)[0]];
}
