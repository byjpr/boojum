import Schema from "warehouse";

module.exports = function(ctx) {
  var Product = new Schema({
    id: {type: Number, default: (Math.random() * (99999999 - 111111) + 111111)},
    url: {type: String, default: ''},
    title: {type: String, default: ''},
    available: {type: Boolean, default: true},
    description: {type: String, default: ''},
    images: [
      {
        src: {type: String, default: ''},
        alt: {type: String, default: ''}
      }
    ]
  });


}
