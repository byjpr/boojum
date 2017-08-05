'use strict';

import App from "../../../app";

exports.command = 'legal'
exports.desc = 'Generate placeholder legal pages'
exports.handler = function (argv) {
  // Period means current directory
  if(argv.dir == '.') argv.dir = process.cwd()

  var boojum = new App(argv.dir, {})

}
