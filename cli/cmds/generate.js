import App from 'app';

module.exports = {
  command: 'setup [dir]',
  aliases: ['s'],
  desc: 'Generate placeholder content',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {});

    boojum.load().writeDefaultDB();
  }
};
