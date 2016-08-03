const AppError = require('./app_error.js');

module.exports = exports = function(err, req, res, next) {
  res.sendError = function(err) {
    console.log(err.message);
    if(AppError.instAppError(err)){
      return res.status(err.statusCode).send(err.responseMessage);
    }
    res.status(500).send('Internal Server Error');
  };
  next();
};
