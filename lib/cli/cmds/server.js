'use strict';

exports.command = 'server [dir]'
exports.aliases = ['s']
exports.desc = 'Starts a rack server'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('server called for dir', argv.dir)
}
