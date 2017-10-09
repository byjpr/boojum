/**
  * A local Shopify theme engine
  * @module Boojum
  */

// From NPM
import logger from 'hexo-log';

// Built in Node Packages
import {EventEmitter} from 'events';
import updateNotifier from 'update-notifier';

import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// Local Includes
import Render from 'controllers/render';
import Stalker from 'controllers/stalker';
import {Renderer, Generator} from 'registers';
import Theme from 'theme';
import utils from 'utils';

import Schema from 'schema';
import setGlobalState from 'settings';

import pkg from 'package.json';

/**
 * State of the entire app.
 * @constructor
 * @param {string} base - Full path to working directory.
 * @param {string} args - Arguments object.
 * @example
 * import App from 'boojum';
 *
 * var boojum = App(false, {debug: false});
 *
 * // Load all required
 * boojum.load();
 * @example
 * import App from 'boojum';
 *
 * var boojum = App(false, {debug: false});
 *
 * // Load the required methods, and the DB
 * boojum.load().loadDB();
 * @returns {object} - Returns `this` object.
 */
function App(base, args) {
  this.base = base || process.cwd();
  this.args = args || {};

  // Check if the app needs to be updated
  // and let people know if it does
  updateNotifier({pkg}).notify();

  // Global Enviroment
  this.env = {
    args,
    env: process.env.NODE_ENV || 'production',
    debug: Boolean(args.debug),
    safe: Boolean(args.safe),
    silent: Boolean(args.silent),
    version: pkg.version,
    name: pkg.name,
    init: false,
  };

  this.utils = utils;

  setGlobalState(this);

  EventEmitter.call(this);

  // Set the log function to be something
  this.log = logger({
    debug: true,
    silent: false,
  });

  return this;
}

App.prototype.load = function() {
  return this
    .loadRegisters()
    .loadControllers();
};

App.prototype.loadRegisters = function() {
  this.register = {
    generator: new Generator(),
    renderer: new Renderer(),
  };

  return this;
};

App.prototype.loadControllers = function() {
  this.render = new Render(this);
  this.stalker = new Stalker(this);
  this.theme = new Theme(this);

  // Load headless controllers
  require('controllers/renderer').default(this);
  require('controllers/router').default(this);

  return this;
};

App.prototype.loadDB = function() {
  const adapter = new FileSync(this.databasePath);
  const db = low(adapter);

  this.Schema = Schema;
  this.db = db;

  return this;
};

/**
 * Load DB & Schema into current `this` context.
 * @returns {object} - Returns `this` object.
 */
App.prototype.loadPlugins = function() {
  require('plugins/generator').default(this);
  require('plugins/renderer').default(this);

  return this;
};
App.prototype.writeDefaultDB = function() {
  const defaults = {
    pages: require('schema/page/defaults').default,
    products: require('schema/product/defaults').default,
    collections: require('schema/collection/defaults').default,
    shop: require('schema/shop/defaults').default
  };

  // Set some defaults if your JSON file is empty
  this.db.defaults(defaults).write();

  return this;
};

export default App;
