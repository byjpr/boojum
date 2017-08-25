import Schema from 'schema-object';

const constructors = {};

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
