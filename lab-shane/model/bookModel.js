'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  bookNumber: Number,
  authorName: String
});

let Book = mongoose.model('Book', bookSchema);
module.exports = exports = Book;
