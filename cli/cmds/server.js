import App from 'app';
import {
  CREATED,
  DELETED,
  MODIFIED,
  RENAMED,
} from 'controllers/stalker/constants';

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

    boojum.stalker.load(boojum.baseDir);

    boojum.stalker.on(CREATED, function(i) {
      console.log("CREATED event: ", i);
    });

    boojum.stalker.on(DELETED, function(i) {
      console.log("DELETED event: ", i);
    });

    boojum.stalker.on(MODIFIED, function(i) {
      console.log("MODIFIED event: ", i);
    });

    boojum.stalker.on(RENAMED, function(i) {
      console.log("RENAMED event: ", i);
    });


  }
};
