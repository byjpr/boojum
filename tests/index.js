import chai from "chai";

chai.use(require('chai-as-promised'));

describe('Global Checks', () => {
  require('./scripts/_bs');
});

describe('Boojum', () => {
  require('./scripts/models');
});
