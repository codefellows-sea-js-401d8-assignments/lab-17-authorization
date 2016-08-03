'use strict';

const User = require('../model/user.js');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const AppError = require('../lib/response_error.js');
const basicHttp = require('../lib/basic_http.js');
const jwt_magic = require('../lib/jwt_magic.js');
const authorize = require('../lib/authorize.js');

let authRouter = module.exports = exports = Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  User.findOne({'basic.email': req.body.email})
  .then((err,user) =>{
    if(err) return err;
    if(user) return res.sendError(AppError.error400('Email already registerd to a user'));
  });
  let newUser = new User();
  newUser.basic.email = req.body.email;
  newUser.username = req.body.username || req.body.email;
  newUser.createHash(req.body.password)
    .then((token) => {
      newUser.save((err, data) => {
        if (err) return err;
        if (!data) return res.sendError(AppError.error404('Invalid data'));
      })
      .then(()=>{
        res.json(token);
      });
      // next();
    });
});

authRouter.get('/signin', basicHttp, (req, res, next) => {
  User.findOne({'basic.email': req.auth.username})
    .then((user) => {
      if (!user) return res.sendError(AppError.error404('User does not exist'));
      user.comparePassword(req.auth.password)
        .then((token) => {
          return res.json(token);
        });
      // next();
    });
});

authRouter.put('/addrole/:username', jsonParser, jwt_magic, authorize(), (req,res,next)=>{
  User.update({username: req.params.username}, {$set:{role:req.body.role}})
  .then((user)=>{
    res.json(user);
    next();
  });
});

authRouter.get('/users', jwt_magic, authorize(), (req,res,next)=>{
  User.find()
  .then((user)=>{
    res.json(user);
    next();
  });
});
