'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = 'localhose:5000/api';
const User = require('../model/user');

describe('authentication', function() {
  it('should create a user', function(done) {
    chai.request(baseUrl)
      .post('/signup')
      .send({email: 'test@example.com', password: 'testPassword'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        expect(res.body.token.length).to.not.eql(0);
        done();
      });
  });

  describe('with a user in the database', function() {
    before(function(done) {
      let user = new User({username: 'test', basic: {email: 'test@example.com'}});
      user.generateHash('testPassword').then((token) => {
        this.tokenData = token;
        user.save().then((userData) => {
          this.user = userData;
          done();
        }, (err) => {throw err;});
      }, (err) => {throw err;});
    });

    it('should authenticate with an existing user', function(done) {
      chai.request(baseUrl)
        .get('/signin')
        .auth('test@example.com', 'testPassword')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          expect(res.body.token.length).to.not.equal(0);
          done();
        });
    });

    it('should not authenticate with bad credentials', function(done) {
      chai.request(baseUrl)
        .get('/signin')
        .auth('bad', 'credentials')
        .end((err, res) => {
          expect(err.message).to.eql('Unauthorized');
          done();
        });
    });

    it('should authenticate with a token', function(done) {
      chai.request(baseUrl)
        .get('/jwtAuth')
        .end((err, res) => {
          expect(err.message).to.eql('Unauthorized');
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
