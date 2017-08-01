'use strict';

export default function(context) {
  context.log.debug('Renderer Controller booted')

  var renderer = context.register.renderer;

  var plain = require('./plain');

  renderer.register('htm', 'html', plain, true);
  renderer.register('html', 'html', plain, true);
  renderer.register('css', 'css', plain, true);
  renderer.register('js', 'js', plain, true);

  renderer.register('liquid', 'liquid', require('./liquid'), true);

  renderer.register('json', 'json', require('./json'), true);
}
