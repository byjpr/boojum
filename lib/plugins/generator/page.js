import Page from 'schema/page';

function pageGenerator(locals) {
  var pages = locals.get('pages').value();

  return pages.map(function(page, i) {
    var data = new Page(page);

    return {
      type: "page",
      url: data.url,
      data
    };

  });

}

module.exports = pageGenerator;
