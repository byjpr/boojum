import App from 'app';

module.exports = {
  command: 'server [dir]',
  aliases: ['s', 'up', 'run'],
  desc: 'Starts a Boojum server',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {}).loadDB().loadPlugins();

    boojum.build();

  }
};
