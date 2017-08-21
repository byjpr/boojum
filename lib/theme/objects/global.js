/* eslint no-undef: 0 */

import util from 'util';
import Objects from '../objects';

function Global(context) {
  this.context = context;
  util.inherits(this, Objects);
}

Global.prototype.expose = function() {
  return {
    all_products, // The `all_products` object contains a list of all the products in your store. You can use `all_products` to access products by their handles.
    articles, // The `articles` object can be used to retrieve an article using its `handle`.
    blogs, // The `blogs` object returns all the blogs in your store
    canonical_url, // The `canonical_url` object returns the canonical URL for the current page. The canonical URL is the page's "default" URL with any URL parameters removed.
    cart,
    collections,
    current_page,
    current_tags,
    customer,
    linklists,
    handle,
    pages,
    page_description,
    page_title,
    shop,
    scripts,
    settings,
    template,
    theme
  };
};

export default Global;
