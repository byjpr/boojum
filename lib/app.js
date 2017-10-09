/**
  * A local Shopify theme engine
  * @module Boojum
  */

// From NPM
import logger from 'hexo-log';

import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import Promise from 'bluebird';

// Built in Node Packages
import {EventEmitter} from 'events';
import updateNotifier from 'update-notifier';

// Controllers
import Render from 'controllers/render';
import Stalker from 'controllers/stalker';
import Router from 'controllers/router';

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

  this.log = logger({
    debug: true,
    silent: false,
  });

  EventEmitter.call(this);

  this.register = {
    generator: new Generator(),
    renderer: new Renderer(),
  };

  this.render = new Render(this);
  this.stalker = new Stalker(this);
  this.theme = new Theme(this);
  this.router = new Router(this);

  return this;
}

/**
 * Load DB & Schema into current `this` context.
 * @returns {object} - Returns `this` object.
 */
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

/**
 * Writes a set of defaults for quick development.
 * @returns {object} - Returns `this` object.
 */
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

/**
 * Build the static site from DB.json.
 */
App.prototype.build = async function() {
  // If we're generating then running again will
  // be problematic, let's shortcircate that shit
  if (this._isGenerating) return;
  this._isGenerating = true;

  const valueA = await this._runGenerators(this.db);
  await this._buildRouter(valueA);

  // console.log(this.router.routes);
};

/**
 * Runs all generators passing in the full DB context for each one.
 * @param {string} db - The current DB.
 */
App.prototype._runGenerators = function(db) {
  const self = this;
  const generators = this.register.generator;
  const generatorsList = generators.list();
  const generatorsKeys = Object.keys(generatorsList);

  db = db || {};

  return Promise.map(generatorsKeys, function(key) {
    return generatorsList[key].call(self, db);
  }).then(function(data) {
    // Data becomes multi dimentional array
    // So using a quick reduce we can flatten it down
    return data.reduce(function(a, b) {
      return a.concat(b);
    }, []);
  });
};

/**
 * Export all build state into the router
 * @param {string}
 */
App.prototype._buildRouter = function(data) {
  const router = this.router;
  data = data || {};

  this.log.debug("App.prototype._buildRouter");

  const keys = Object.keys(data);

  return Promise.map(keys, function(key) {
    let current = data[key];
    return router.set(current.url, current.data);
  });
};

export default App;
