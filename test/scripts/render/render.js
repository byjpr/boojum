import {should,expect} from "chai";
import Path from "path";
import App from "../../../lib/app.js";

var hexo = new App();

describe('Test Render Engine', () => {

  it('Renders swig from text input', () => hexo.render.render({
    text: [
      '<title>{{ title }}</title>',
      '<body>{{ content }}</body>'
    ].join('\n'),
    engine: 'swig'
  }, {
    title: 'Hello world',
    content: 'foobar'
  }).then(result => {
    expect(result).to.eql([
      '<title>Hello world</title>',
      '<body>foobar</body>'
    ].join('\n'))
  }));

  it('Renders liquid from text input', () => hexo.render.render({
    text: [
      '<title>{{ title }}</title>',
      '<body>{{ content }}</body>'
    ].join('\n'),
    engine: 'liquid'
  }, {
    title: 'Hello world',
    content: 'foobar'
  }).then(result => {

    expect(result).to.eql([
      '<title>Hello world</title>',
      '<body>foobar</body>'
    ].join('\n'))
  }));

});
