'use strict';
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const ErrorHandler = require('../lib/errorHandler');
const User = require('../model/user');
const BasicHTTP = require('../lib/basicHttp');
const authrzn = require('../lib/authorization');
const jwtAuth = require('../lib/jwtAuthorization');

let authRouter = module.exports = exports = Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  let newUser = new User();
  newUser.basic.email = req.body.email;
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password)
    .then((tokenData) => {
      newUser.save()
      .then(() => {
        res.json(tokenData);
      }, ErrorHandler(400, next));
    }, ErrorHandler(500, next, 'Server Error'));
});

authRouter.get('/signin', BasicHTTP, (req, res, next) => {
  let authError = ErrorHandler(401, next, 'Authentication Failed');
  User.findOne({'basic.email': req.auth.username})
    .then((user) => {
      if (!user) return authError(new Error('No such User'));
      user.comparePassword(req.auth.password).then(res.json.bind(res), authError);
    }, authError);
});

authRouter.put('/addrole/:userid', jsonParser, jwtAuth, authrzn(), (req, res, next) => {
  User.update({_id: req.params.userid}, {$set: {role: req.body.role}})
  .then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

authRouter.get('/users', jsonParser, jwtAuth, authrzn(), (req, res, next) => {
  User.find().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});
