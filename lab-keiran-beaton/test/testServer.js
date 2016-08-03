'use strict';
const mongoose = require('mongoose');
const jwtAuth = require('../lib/jwtAuthorization');
mongoose.connect('mongodb://localhost/auth_test');
let app = require('express')();
const authRouter = require('../routes/auth_router');
app.use('/api', authRouter);
app.get('/api/jwtAuth', jwtAuth, function(req, res) {
  res.json({msg: 'success'});
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
});

app.listen(5000);
