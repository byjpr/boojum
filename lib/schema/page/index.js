import Schema from 'schema-object';
import getURL from 'speakingurl';
import Image from 'models/product/image';

const constructors = {
  default: function(values) {
    this.super(values);

    if(this.id === undefined) {
      this.id = 'asdfasdfasdf';
    }

    if(this.url === undefined) {
      const url = getURL(this.title);
      this.url = url;
    }

  },
};

const methods = {};

const Page = new Schema({
  id: {type: String}, // Static method
  title: {type: String, required: true}, // Static method
  url: {type: String}, // Static method
  author: {type: String},
  content: {type: String},
  handle: {type: String},
  published_at: {type: String},
  template_suffix: {type: String},
}, {
  constructors,
  methods,
});

export default Page;
