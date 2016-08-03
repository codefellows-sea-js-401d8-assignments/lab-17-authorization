const mongoose = require('mongoose');

module.exports = exports = function(serv, done) {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.disconnect(() => {
      serv.close();
      done();
    });
  });
};
