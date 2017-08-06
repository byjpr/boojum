'use strict';

import { Engine } from 'liquid-node'

function liquidRenderer(data, locals) {
  var engine = new Engine
  return engine
    .parseAndRender(data.text, locals)
    .then(function(result) { return result });
}

module.exports = liquidRenderer;
