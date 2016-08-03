process.env.APP_SECRET = 'test';
require('./testServer');
require('./authenticationTest');

const mongoose = require('mongoose');
process.on('exit', () => {
  mongoose.connection.db.dropDatabase(() => console.log('db dropped'));
});
