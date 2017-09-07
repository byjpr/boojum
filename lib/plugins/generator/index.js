export default function(context) {
  const generator = context.register.generator;

  generator.register('catalog', require('./catalog'));
  generator.register('product', require('./product'));
  generator.register('page', require('./page'));
}
