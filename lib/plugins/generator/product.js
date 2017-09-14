import Product from 'schema/product';

function productGenerator(locals) {
  var products = locals.get('products').value();
  var length = products.length;

  return products.map(function(product, i) {
    if(i) product.prev = products[i - 1];
    if(i < length - 1) product.next = products[i + 1];

    return new Product(product);
  });

}

module.exports = productGenerator;
