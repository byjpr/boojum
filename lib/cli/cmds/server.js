'use strict';

import App from "../../app"
var nsfw = require('nsfw');

exports.command = 'server [dir]'
exports.aliases = ['s']
exports.desc = 'Starts a rack server'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  // Period means current directory
  if(argv.dir == '.') argv.dir = process.cwd()

  var boojum = new App(argv.dir, {})


}
