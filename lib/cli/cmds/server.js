'use strict';

import App from "../../app"
var watchr = require('watchr')

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

  // Watch the path with the change listener and completion callback
  var stalker = watchr.open(argv.dir, listener, next)
}

function listener (changeType, fullPath, currentStat, previousStat) {
  switch ( changeType ) {
    case 'update':
    	console.log('the file', fullPath, 'was updated')
    	break
    case 'create':
    	console.log('the file', fullPath, 'was created')
    	break
    case 'delete':
    	console.log('the file', fullPath, 'was deleted')
    	break
  }
}

function next (err) {
	if ( err )  return console.log('watch failed on', path, 'with error', err)
	console.log('watch successful on', path)
}
