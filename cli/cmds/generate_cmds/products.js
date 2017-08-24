import App from '../../../app';
import Faker from 'Faker';

module.exports = {
  command: 'products [number]',
  desc: 'Generate placeholder products',
  builder: {
    number: {
      default: 5,
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {});
  }
};
