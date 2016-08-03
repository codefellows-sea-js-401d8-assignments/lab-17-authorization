'use strict';
const mongoose = require('mongoose');

module.exports = exports = mongoose.model('Friend', {
  name: {type: String, required: true},
  city: {type: String, default: 'Seattle'},
  gender: String,
  adminId: String
});
