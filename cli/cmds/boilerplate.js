import App from 'app';

module.exports = {
  command: 'boilerplate [dir]',
  aliases: ['b', 'default', 'new'],
  desc: 'Generate boilerplate content',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {});

    boojum.load().loadDB().writeDefaultDB();
  }
};
