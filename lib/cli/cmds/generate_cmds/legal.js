import App from '../../../app';

module.exports = {
  command: 'legal',
  desc: 'Generate placeholder legal pages',
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {});
  }
};
