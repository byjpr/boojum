import Schema from 'schema-object';

const constructors = {
  default: function(values) {
    this.super(values);
  },
};

const methods = {
  "attached_to_variant?": function() {
    return false;
  },
};

const Image = new Schema({
  // "attached_to_variant?": {},
  alt: {type: String},
  id: {type: String},
  product_id: {type: String},
  position: {type: Number},
  src: {type: String},
  variants: {type: Array},
  height: {type: Number},
  width: {type: Number},
  aspect_ratio: {type: String},
}, {
  constructors,
  methods,
});

export default Image;
