import App from 'app';

module.exports = {
  command: 'clean [dir]',
  aliases: ['c'],
  desc: 'Create an empty repo',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {});
  }
};
