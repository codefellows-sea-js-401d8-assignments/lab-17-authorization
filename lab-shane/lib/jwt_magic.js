'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user.js');

module.exports = exports = function(req, res, next) {
  new Promise((resolve, reject) => {
    let tok = req.headers.authorization.split(' ')[1];
    let decode = jwt.verify(tok, process.env.APP_SECRET);
    User.findOne({'basic.email': decode.idd})
      .then((user) => {
        req.user = user;
        console.log('req.user: ', req.user);
        resolve();
        next();
      }, reject);
  }).catch((err) => {
    if (err) console.log(err);
    next();
  });
};
