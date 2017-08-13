

import {Engine} from 'liquid-node';

function liquidRenderer(data, locals) {
  const engine = new Engine();
  return engine
    .parseAndRender(data.text, locals)
    .then((result) => { return result; });
}

module.exports = liquidRenderer;
