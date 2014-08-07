var app = require('../../app.js'),
    request = require('supertest');

describe("site routes", function(){

  it("should respond with 200 status for index page", function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });

  
}); // ends describe