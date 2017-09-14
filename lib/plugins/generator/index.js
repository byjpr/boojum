export default function(context) {
  const generator = context.register.generator;

  generator.register('collection', require('./collection'));
  generator.register('product', require('./product'));
  generator.register('page', require('./page'));
}
