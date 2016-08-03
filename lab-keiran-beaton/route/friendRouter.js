'use strict';
const jsonParser = require('body-parser').json();
const Friend = require('../model/friend');
const ErrorHandler = require('../lib/errorHandler');
const jwtAuth = require('../lib/jwtAuthorization');
const authrzn = require('../lib/authorization');

let friendRouter = module.exports = exports = require('express').Router();

friendRouter.get('/', (req, res, next) => {
  Friend.find().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

friendRouter.post('/', jsonParser, jwtAuth, authrzn(['admin']), (req, res, next) => {
  req.body.adminId = req.user._id;
  new Friend(req.body).save().then(res.json.bind(res), ErrorHandler(400, next));
});
