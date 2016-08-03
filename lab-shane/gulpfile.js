'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');

var files = ['./lib/*', './model/*', './route/*', './test/*'];

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint({
      rules: {
        'indent': [
          2,
          2
        ],
        'quotes': [
          2,
          'single'
        ],
        'linebreak-style': [
          2,
          'unix'
        ]
      },
      env: {
        'es6': true,
        'node': true,
        'browser': true
      }
    }))
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src('./test/test.js', {
    read: false
  })
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('nodemon-restart', () =>{
  nodemon({
    script: './lib/server_gulp.js',
    ext: 'js html',
    env: {'NODE-ENV': 'development'}
  });
});

gulp.task('default', ['lint', 'test', 'nodemon-restart']);
