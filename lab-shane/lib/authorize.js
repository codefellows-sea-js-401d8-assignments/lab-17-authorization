'use strict';

const AppError = require('./response_error.js');

module.exports = exports = function(roles) {
  roles = roles || [];
  return function(req, res, next) {
    console.log(req.user);
    new Promise((resolve, reject) => {
      if (req.user.role === 'admin') return resolve();
      reject(AppError.error404('Not Authorized'));
      next();
    })
    .catch(err => next(err));
  };
};
