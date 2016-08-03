'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const BookModel = require('../model/bookModel.js');
const AppError = require('../lib/app_error.js');

let bookRouter = module.exports = exports = new Router();

bookRouter.get('/:_id', (req, res) => {
  let _id = req.params._id;
  BookModel.findOne({_id}, (err, p) => {
    if(p != null){
      if (err) return (err);
      return res.json(p);
    } else{
      return res.sendError(AppError.error404('Book not found!'));
    }
  });
});

bookRouter.post('/', jsonParser, (req, res) => {
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted.'));
  }
  BookModel.findOne({name: req.body.name}, (err, p) => {
    if (p == null) {
      let newBookModel = new BookModel(req.body);
      newBookModel.save((err, books) => {
        return res.json(books);
      });
    } else {
      res.sendError(AppError.error400('Book already exists, try a PUT instead.'));
    }
  });
});

bookRouter.put('/:name', jsonParser, (req, res) => {
  let name = req.params.name;
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted for book ' + req.params.name + '.'));
  }
  BookModel.findOne({
    name: name
  }, (err, p) => {
    if (p != null) {
      BookModel.findOneAndUpdate({name: name}, req.body, () => {
        res.send('Book ' + name + ' updated!');
      });
    } else{
      return res.sendError(AppError.error404('Book does not yet exist on server.'));
    }
  });
});

bookRouter.delete('/:name', (req, res) => {
  let name = req.params.name;
  BookModel.findOne({name: name}, (err, p) => {
    if (p != null) {
      BookModel.remove({name}, () =>{
        res.send('Book ' + name + ' was deleted!');
      });
    } else{
      return res.sendError(AppError.error404('Book does not yet exist on server.'));
    }
  });
});

bookRouter.all('/', (req,res) => {
  return res.sendError(AppError.error400('Unregistered location, please specify a book at book/name.'));
});
