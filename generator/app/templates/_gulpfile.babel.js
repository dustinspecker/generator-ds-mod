'use strict';
import alex from 'gulp-alex';
import babel from 'gulp-babel';
import babelCompiler from 'babel-core';
import del from 'del';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import istanbul from 'gulp-istanbul';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';

const configFiles = './gulpfile.babel.js'
  , srcFiles = 'src/*.js'
  , testFiles = 'test/*.js'

  , destDir = './lib/';

gulp.task('clean', () => del(destDir));

gulp.task('alex', () => {
  return gulp.src('./README.md')
    .pipe(alex({fail: true}));
});

gulp.task('lint', ['clean', 'alex'], () => {
  return gulp.src([configFiles, srcFiles, testFiles])
    .pipe(eslint())
    .pipe(eslint.formatEach('./node_modules/eslint-path-formatter'))
    .pipe(eslint.failOnError())
    .pipe(jscs({
      esnext: true
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('compile', ['lint'], () => {
  return gulp.src(srcFiles)
    .pipe(babel({
      auxiliaryCommentBefore: 'istanbul ignore next',
      modules: 'common'
    }))
    .pipe(gulp.dest(destDir));
});

gulp.task('build', ['compile']);

gulp.task('pre:test', ['build'], () => {
  return gulp.src([destDir + '*/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre:test'], () => {
  return gulp.src([testFiles])
    .pipe(mocha({
      compilers: {
        js: babelCompiler
      }
    }))
    .pipe(istanbul.writeReports());
});
});
