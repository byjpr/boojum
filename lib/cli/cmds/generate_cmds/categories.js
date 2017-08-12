

import App from '../../../app';

exports.command = 'categories [number]';
exports.desc = 'Generate placeholder categories';
exports.builder = {
  number: {
    default: 10,
  },
};
exports.handler = function(argv) {
  // Period means current directory
  if (argv.dir == '.') { argv.dir = process.cwd(); }

  const boojum = new App(argv.dir, {});


};
