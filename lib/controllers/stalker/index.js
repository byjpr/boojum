

import nsfw from 'nsfw'; // node-sentinel-file-watcher

//  “When someone is stalking you because they think you are stalking them,
//  it makes you wonder who really is the true stalker?”
//  - Someone on the internet
//   ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)

function Stalker(context) {
  context.log.debug('Stalker Controller booted');

  this.context = context;
  this.stalker = false;
  this.booted = false;
  this.notificationHandler = false;
  /* eslint-disable no-console */
  this.defaultNotificationHandler = console.log;
  /* eslint-enable no-console */
}

// `Stalker.setHandler` sets up the `this.notificationHandler`
// Check to make sure handler param is a function, for sanity
Stalker.prototype.setHandler = function(handler) {
  if (typeof handler !== 'function') { throw new TypeError('Handler must be a function!'); }
  return this.notificationHandler = handler;
};

// `Stalker.routeHandler` Sends notifications to the correct handler.
// Checks to see if a handler has been set.
// If `this.notificationHandler` is falsy then it will route to the default.
Stalker.prototype.routeHandler = function(events) {
  if (this.notificationHandler) { return this.notificationHandler(events); }
  this.defaultNotificationHandler(events);
};

// When you're ready to load stalker with a path
// to the directory you want to be watched simply call
// `stalker.load(path)` and you're directory will be stalked ( ͡° ͜ʖ ͡°)
Stalker.prototype.load = function(path) {
  const context = this;

  return nsfw(path, (events) => {
    context.routeHandler(events);
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

export default function(context) {
  const stalker = new Stalker(context);
  stalker.load(context.base_dir);

  return stalker;
}
