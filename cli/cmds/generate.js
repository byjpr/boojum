import App from 'app';

module.exports = {
  command: 'generate [dir]',
  aliases: ['g'],
  desc: 'Generate markup',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {}).load().loadDB();

    boojum.build();

  }
};
