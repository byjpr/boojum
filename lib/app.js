'use strict';

/**
 * app.js
 *
 * This is the entry file for the application, only setup code.
 */

// From NPM
import logger from 'hexo-log'
import updateNotifier from 'update-notifier'
import chalk from 'chalk'
import Warehouse from 'warehouse'

// Built in Node Packages
import path, { sep } from 'path'
import { EventEmitter } from 'events'

// Local Includes
import pkg from '../package.json'
import { Renderer, Generator, CLI, Filter } from './registers'
import Render from './controllers/render'
import utils from './utils'

import instantiateModels from './utils/bootstrap/models.js'

// The App Constructor
// This contains everything that is needed
// for any service to communicate
// or run something
function App(base, args) {
  base = base || process.cwd()
  args = args || {}

  // Global Enviroment
  this.env = {
    args: args,
    debug: Boolean(args.debug),
    safe: Boolean(args.safe),
    silent: Boolean(args.silent),
    env: 'development',
    version: pkg.version,
    name: pkg.name,
    dbVersion: 1,
    init: false
  }

  // Check if the app needs to be updated
  // and let people know if it does
  updateNotifier({pkg}).notify()

  EventEmitter.call(this)

  // Global Location Information
  this.base_dir = utils.addTrailingSep(base, sep)
  this.lib_dir = utils.addTrailingSep(base + sep + 'lib', sep)
  this.public_dir = utils.addTrailingSep(path.join(base, 'public'), sep)
  this.source_dir = utils.addTrailingSep(path.join(base, 'source'), sep)
  this.plugin_dir = utils.addTrailingSep(path.join(base, 'node_modules'), sep)
  this.database_loc = path.join(base, 'db.json')

  // Global State
  this._dbLoaded = false
  this._isGenerating = false
  this.version = this.env.version;

  // Set the log function to be something
  this.log = logger({
    debug: true,
    silent: false
  })

  this.log.debug('Boojum version: %s', chalk.magenta(this.version))
  this.log.debug('Working directory: %s', chalk.magenta(this.base_dir))

  // The global register
  this.register = {
    filter: new Filter(),
    console: new CLI(),
    generator: new Generator(),
    renderer: new Renderer()
  };

  this.render = new Render(this);

  // Our database
  this.database = new Warehouse({
    version: 1,
    path: this.database_loc
  });

  this.utils = utils;

  instantiateModels(this)

  // Load controllers
  require('./controllers/renderer').default(this)
  require('./controllers/router').default(this)
  require('./controllers/renderer').default(this)

}

App.prototype.execFilter = function(type, data, options) {
  return this.register.filter.exec(type, data, options);
};

App.prototype.execFilterSync = function(type, data, options) {
  return this.register.filter.execSync(type, data, options);
};


// App.prototype.call = function(name, args, callback) {
//   if (!callback && typeof args === 'function') {
//     callback = args;
//     args = {};
//   }
//
//   var self = this;
//
//   return new Promise(function(resolve, reject) {
//     var c = self.register.console.get(name);
//
//     if (c) {
//       c.call(self, args).then(resolve, reject);
//     } else {
//       reject(new Error('Console `' + name + '` has not been registered yet!'));
//     }
//   }).asCallback(callback);
// };


export default App
