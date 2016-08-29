'use strict';
const mongoose = require('mongoose');

module.exports = exports = mongoose.model('Student', {
  name: {type: String, required: true},
  language: {type: String, default: 'javascript'},
  country: {type: String, default: 'United States'},
  wrangledId: String
});
