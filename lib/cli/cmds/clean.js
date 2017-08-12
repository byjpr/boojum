

import App from '../../app';

exports.command = 'clean [dir]';
exports.aliases = ['c'];
exports.desc = 'Create an empty repo';
exports.builder = {
  dir: {
    default: process.cwd(),
  },
};
exports.handler = function(argv) {
  // Period means current directory
  if (argv.dir == '.') { argv.dir = process.cwd(); }

  const boojum = new App(argv.dir, {});

};
