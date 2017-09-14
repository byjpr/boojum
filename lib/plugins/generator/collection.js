import Collection from 'schema/collection';

function collectionGenerator(locals) {
  var collections = locals.get('collections').value();

  return collections.map(function(collection, i) {
    return new Collection(collection);
  });
}

module.exports = collectionGenerator;
