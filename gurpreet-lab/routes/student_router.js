'use strict';

const Student = require('../models/student');
const jsonParser = require('body-parser').json();
const ErrorHandler = require('../lib/error_handler');
const jwt_auth = require('../lib/jwt_auth');
const authzn = require('../lib/authorization');
let studentRouter = module.exports = exports = require('express').Router();

studentRouter.get('/', (req, res, next) => {
  Student.find().then(res.json.bind(res), ErrorHandler(500, next, 'server Error'));
});

studentRouter.post('/', jsonParser, jwt_auth,authzn(['wrangler']), (req, res, next) => {
  req.body.wranglerId = req.user._id;
  new Student(req.body).save().then(res.json.bind(res), ErrorHandler(400, next));
});
