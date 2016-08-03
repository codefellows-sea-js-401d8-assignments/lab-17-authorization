'use strict';

if (!process.env.APP_SECRET) throw new Error('Please set up the env APP_SECRET');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:auth_dev');
let app = require('express')();
let serverError = require('debug')('cflab:error');
let authRouter = require('./route/authRouter');
let friendRouter = require('./route/friendRouter');
let port = 3000;

app.use('/api', authRouter);
app.use('/api/friend', friendRouter);

app.use((err, req, res, next) => {
  serverError(err);
  res.status(err.statusCode || 500).json(err.message);
});
app.listen(port, () => console.log('server is up'));
