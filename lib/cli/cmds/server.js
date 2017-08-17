import App from '../../app';

module.exports = {
  command: 'server [dir]',
  aliases: ['s'],
  desc: 'Starts a rack server',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler: function(argv) {
    if (argv.dir == '.') { argv.dir = process.cwd(); }

    const boojum = new App(argv.dir, {});

    boojum.stalker.load(boojum.base_dir);

    boojum.stalker.on('changes', function(i) {
      console.log(i);
    });


  }
};
