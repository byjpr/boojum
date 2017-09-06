import nsfw from 'nsfw'; // node-sentinel-file-watcher
import util from 'util';
import {EventEmitter} from 'events';

import StalkerHandler from './handlers';

//  “When someone is stalking you because they think you are stalking them,
//  it makes you wonder who really is the true stalker?”
//  - Someone on the internet
//   ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)

function Stalker(context) {
  context.log.debug('Stalker Controller booted');

  this.context = context;
  this.stalker = false;
  this.booted = false;
  this.debug = Boolean(context.env.debug);

  EventEmitter.call(this);

  this.handler = new StalkerHandler(this);
}

util.inherits(Stalker, EventEmitter);

// `Stalker.emitter` Sends notifications to the correct handler.
// Logs out to console if debug
Stalker.prototype.emitter = function(events) {
  if (this.debug) { console.log(events); }
  this.handler.start(events);
};

// When you're ready to load stalker with a path
// to the directory you want to be watched simply call
// `stalker.load(path)` and you're directory will be stalked ( ͡° ͜ʖ ͡°)
Stalker.prototype.load = function(path) {
  const context = this;

  return nsfw(path, (events) => {
    context.emitter(events);
  })
    .then((stalker) => {
      context.stalker = stalker;
      return context.stalker.start();
    })
    .then((stalker) => {
      context.booted = true;
      return stalker;
    });
};

// Stop the stalker and set booted to false
Stalker.prototype.unload = function() {
  const context = this;

  return this.stalker.stop()
    .then((stalker) => {
      context.stalker = false;
      context.booted = false;
      return stalker;
    });
};

export default Stalker;
