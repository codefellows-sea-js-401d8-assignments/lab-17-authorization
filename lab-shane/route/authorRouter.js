'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const AuthorModel = require('../model/authorModel.js');
const AppError = require('../lib/app_error.js');
const authorBookRouter = require('./authorBookRouter.js');

let authorRouter = module.exports = exports = new Router();

authorRouter.get('/all', (req, res) => {
  AuthorModel.find({}, (err, authors) => {
    if (err) return (err);
    return res.json(authors);
  });
});

authorRouter.get('/:name', (req, res) => {
  let name = req.params.name;
  AuthorModel.findOne({name}, (err, p) => {
    if(p != null){
      if (err) return (err);
      return res.json(p);
    } else{
      return res.sendError(AppError.error404('Author not found!'));
    }
  });
});

authorRouter.post('/', jsonParser, (req, res) => {
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted.'));
  }
  AuthorModel.findOne({name: req.body.name}, (err, p) => {
    if (p == null) {
      let newAuthorModel = new AuthorModel(req.body);
      newAuthorModel.save((err, authors) => {
        return res.json(authors);
      });
    } else {
      res.sendError(AppError.error400('Author already exists, try a PUT instead.'));
    }
  });
});

authorRouter.put('/:name', jsonParser, (req, res) => {
  let name = req.params.name;
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted for author ' + req.params.name + '.'));
  }
  AuthorModel.findOne({
    name: name
  }, (err, p) => {
    if (p != null) {
      AuthorModel.findOneAndUpdate({name: name}, req.body, () => {
        res.send('Author ' + name + ' updated!');
      });
    } else{
      return res.sendError(AppError.error404('Author does not yet exist on server.'));
    }
  });
});

authorRouter.delete('/:name', (req, res) => {
  let name = req.params.name;
  AuthorModel.findOne({name: name}, (err, p) => {
    if (p != null) {
      AuthorModel.remove({name}, () =>{
        res.send('Author ' + name + ' was deleted!');
      });
    } else{
      return res.sendError(AppError.error404('Author does not yet exist on server.'));
    }
  });
});

authorRouter.all('/', (req,res) => {
  return res.sendError(AppError.error400('Unregistered location, please specify a author at author/name.'));
});

authorRouter.use('/:name/book', authorBookRouter);
