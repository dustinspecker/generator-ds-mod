'use strict'
import alex from 'gulp-alex'
import babel from 'gulp-babel'
import babelCompiler from 'babel-core'
import del from 'del'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import eslint from 'gulp-eslint'
import istanbul from 'gulp-istanbul'
import mocha from 'gulp-mocha'
import plumber from 'gulp-plumber'

const cwd = process.cwd()

  , configFiles = './gulpfile.babel.js'
  , srcFiles = 'generator/app/*.js'
  , templateFiles = ['generator/app/*/*', 'generator/app/*/.travis.yml']
  , testFiles = 'test/*.js'

  , destDir = './app'

let watching = false

gulp.task('clean', () => del(destDir))

gulp.task('alex', () =>
  gulp.src('./README.md')
    .pipe(alex())
    .pipe(alex.reporter())
    .pipe(alex.reporter('fail'))
)

gulp.task('lint', ['alex'], () =>
  gulp.src([configFiles, srcFiles, testFiles])
    .pipe(eslint())
    .pipe(gulpIf(!watching, eslint.failOnError()))
)

gulp.task('compile', ['clean', 'lint'], () =>
  gulp.src(srcFiles, {base: './generator/app/'})
    .pipe(babel())
    .pipe(gulp.dest(destDir))
)

gulp.task('copy:templates', ['compile'], () =>
  gulp.src(templateFiles, {base: './generator/app/'})
    .pipe(gulp.dest(destDir))
)

gulp.task('build', ['copy:templates'])

gulp.task('pre:test', ['build'], () =>
  gulp.src([`${destDir}**/*.js`])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
)

gulp.task('test', ['pre:test'], () =>
  gulp.src([testFiles])
    .pipe(gulpIf(watching, plumber()))
    .pipe(mocha({
      compilers: {
        js: babelCompiler
      }
    }))
    .pipe(istanbul.writeReports())
    .on('end', () => {
      // Something in this task changes the process CWD and causes chaos.
      // This line changes back to the original CWD.
      process.chdir(cwd)
    })
)

gulp.task('watch', () => {
  watching = true
  gulp.watch([srcFiles, templateFiles, testFiles], ['test'])
})
