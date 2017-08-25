import Schema from 'schema-object';

const constructors = {
  allowFalsyValues: false,
};

const methods = {
  "attached_to_variant?": function() {
    return false;
  },
};

const Image = new Schema({
  // "attached_to_variant?": {},
  alt: {type: String},
  id: {type: String, required: true},
  product_id: {type: String, required: true},
  position: {type: Number},
  src: {type: String, required: true},
  variants: {type: Array},
  height: {type: Number},
  width: {type: Number},
  aspect_ratio: {type: String},
}, {
  constructors,
  methods,
});

export default Image;
