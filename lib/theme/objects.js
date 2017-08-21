function Objects() {
  this.config = {}; // Active Theme Config
  this.views = {}; // Active Theme Views
  this.processors = []; // Processors
}

// Objects.prototype.jsx = function(a, b, ...c) {
//   return {a,b,c};
// };

Objects.prototype.setProps = function(...props) {
  return this.props = props;
};

export default Objects;
