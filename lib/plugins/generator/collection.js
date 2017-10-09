import Collection from 'schema/collection';

function collectionGenerator(locals) {  
  var collections = locals.get('collections').value();

  return collections.map(function(collection, i) {
    var data = new Collection(collection);

    return {
      type: "collection",
      url: data.url,
      data
    };
  });
}

module.exports = collectionGenerator;
