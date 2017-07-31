'use strict';

exports.command = 'generate [dir] [type]'
exports.aliases = ['g']
exports.desc = 'Generate placeholder content'
exports.builder = {
  dir: {
    default: '.'
  },
  type: {
    default: 'product',
  }
}
exports.handler = function (argv) {
  console.log('generate called for dir', argv.dir, argv.type)
}
