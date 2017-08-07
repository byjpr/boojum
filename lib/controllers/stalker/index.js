'use strict';

import nsfw from 'nsfw' // node-sentinel-file-watcher

//  “When someone is stalking you because they think you are stalking them,
//  it makes you wonder who really is the true stalker?”
//  - Someone on the internet
//   ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)     ( ͡° ͜ʖ ͡°)

function Stalker(context) {
  this.context = context;
  this.stalker = false;
  this.booted = false;
  this.notificationHandler = false;
  this.defaultNotificationHandler = context.log.debug;
}

// `Stalker.setHandler` sets up the `this.notificationHandler`
// Check to make sure handler param is a function, for sanity
Stalker.prototype.setHandler = function(handler) {
  if (typeof handler !=== 'function') throw new TypeError('Handler must be a string!');
  return this.notificationHandler = handler
}

// `Stalker.routeHandler` Sends notifications to the correct handler.
// Checks to see if a handler has been set.
// If `this.notificationHandler` is falsy then it will route to the default.
Stalker.prototype.routeHandler = function(events) {
  if(this.notificationHandler) return this.notificationHandler(events)
  this.defaultNotificationHandler(events)
}

// When you're ready to load stalker with a path
// to the directory you want to be watched simply call
// `stalker.load(path)` and you're directory will be stalked ( ͡° ͜ʖ ͡°)
Stalker.prototype.load = function(path) {
  var context = this;

  return nsfw(path, context.routeHandler)
    .then(function(stalker) {
      context.stalker = stalker;
      return context.stalker.start();
    })
    .then(function() {
      context.booted = true;
    })
}

// Stop the stalker and set booted to false
Stalker.prototype.unload = function() {
  var context = this;

  return this.stalker.stop()
    .then(function() {
      context.stalker = false;
      context.booted = false;
    });
}
