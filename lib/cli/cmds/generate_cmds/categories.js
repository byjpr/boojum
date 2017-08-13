import App from '../../../app';

module.exports = {
  command: 'categories [number]',
  desc: 'Generate placeholder categories',
  builder: {
    number: {
      default: 10,
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {});
  }
};
