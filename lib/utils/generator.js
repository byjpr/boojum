'use strict';

import Promise from 'bluebird'
import abbrev from 'abbrev'

function Generator() {
  this.store = {};
  this.alias = {};
}
