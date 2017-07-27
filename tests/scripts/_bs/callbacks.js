import should from "chai";

describe('Callbacks', () => {
  it("function with no assertions", function(done) {
    setTimeout(done, 10)
  })

  it("valid asynchronous test", function(done) {
    setTimeout(function() { // (more realistically, could be an asynchronous API with result passed to callback)
      done() // ! Mocha knows the test is complete at this point
    }, 50)
  })
});
