import Page from 'schema/page';

function pageGenerator(locals) {
  var pages = locals.get('pages').value();

  return pages.map(function(page, i) {
    return new Page(page);
  });

}

module.exports = pageGenerator;
