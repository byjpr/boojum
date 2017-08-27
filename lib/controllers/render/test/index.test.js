import test from 'ava';
import App from "app";

var boojum = new App();

const input = [
  '<title>{{ title }}</title>',
  '<body>{{ content }}</body>'
].join('\n');

const content = {
  title: 'Hello world',
  content: 'foobar'
};

const expectedResult = [
  '<title>Hello world</title>',
  '<body>foobar</body>'
].join('\n');

test('Renders swig from text input', t => {
  return boojum.render.render({
    text: input,
    engine: 'swig'
  }, content).then(result => {
    return t.deepEqual(result, expectedResult);
  });
});

test('Renders liquid from text input', t => {
  return boojum.render.render({
    text: input,
    engine: 'liquid'
  }, content).then(result => {
    return t.deepEqual(result, expectedResult);
  });
});
