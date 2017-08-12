

import App from '../../../app';
import Faker from 'Faker';

exports.command = 'products [number]';
exports.desc = 'Generate placeholder products';
exports.builder = {
  number: {
    default: 5,
  },
};
exports.handler = function(argv) {
  // Period means current directory
  if (argv.dir == '.') { argv.dir = process.cwd(); }

  const boojum = new App(argv.dir, {});


};
