'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

let scripts = ['./server.js', './lib/*.js', './model/*.js', './route/*.js'];
gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('start', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {'NODE_ENV': 'development'}
  });
});

gulp.task('watch', () => {
  gulp.watch(scripts, ['start']);
});

gulp.task('default', ['start', 'watch', 'lint']);
