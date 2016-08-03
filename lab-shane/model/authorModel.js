'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookModel = require('./bookModel.js');

const AuthorSchema = new Schema({
  name: {type:String, require:true},
  genre: String

});

AuthorSchema.methods.getAllBooks = function(){
  return BookModel.find({authorName: this.name});
};

AuthorSchema.methods.addBook = function(bookId){
  return BookModel.findOneAndUpdate({title: bookId}, {authorName: this.name});
};

AuthorSchema.methods.removeBook = function(bookId){
  return BookModel.findOneAndUpdate({title: bookId}, {authorName:null});
};

AuthorSchema.methods.createBook = function(book){
  let Book = new BookModel(book);
  Book.authorName = this.name;
  return Book.save();
};

let Author = mongoose.model('Author', AuthorSchema);
module.exports = exports = Author;
