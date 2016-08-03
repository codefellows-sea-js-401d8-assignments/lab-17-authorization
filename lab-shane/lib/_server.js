'use strict';

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const morgan = require('morgan');
const authorServer = 'mongodb://localhost/author';
const testServer = process.env.mongoTestServer || authorServer;
const authorizationRouter = require('../route/authorization_router.js');
const authorRouter = require('../route/authorRouter.js');
const bookRouter = require('../route/bookRouter.js');
const resError = require('./response_error.js');

let server = module.exports = exports = express();

let accessLogStream = fs.createWriteStream('./access.log', {
  flags: 'a'
});

server.use(morgan('combined', {
  stream: accessLogStream
}));

mongoose.connect(testServer);

server.use(resError);

server.use('/api', authorizationRouter);
server.use('/api/author', authorRouter);
server.use('/api/book', bookRouter);
