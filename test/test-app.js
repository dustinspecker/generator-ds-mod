/*global describe, before, it*/
'use strict';
var assert = require('yeoman-generator').assert
  , helpers = require('yeoman-generator').test
  , join = require('path').join
  , sinon = require('sinon');

describe('App Generator with installDependencies', function () {
  var gen;

  before(function (done) {
    helpers
      .run(join(__dirname, '../generator/app'))
      .withOptions({
        'skip-install': false
      })
      .withPrompts({
        projectName: 'awesome-mod',
        description: 'An awesome project.',
        fullName: 'Dustin Specker',
        githubUser: 'dustinspecker'
      })
      .withGenerators([
        join(__dirname, '../generator/app')
      ])
      .on('ready', function (generator) {
        gen = generator;
        generator.installDependencies = sinon.spy();
      })
      .on('end', done);
  });

  it('should install dependencies', function () {
    assert(gen.installDependencies.calledOnce);
  });
});

describe('App generator', function () {
  var gen;

  before(function (done) {
    helpers
      .run(join(__dirname, '../generator/app'))
      .withPrompts({
        projectName: 'awesome-mod',
        description: 'An awesome project.',
        fullName: 'Dustin Specker',
        githubUser: 'dustinspecker'
      })
      .withGenerators([
        join(__dirname, '../generator/app')
      ])
      .on('ready', function (generator) {
        gen = generator;
        generator.installDependencies = sinon.spy();
        generator.log = sinon.spy();
      })
      .on('end', done);
  });

  it('should welcome user', function () {
    assert(gen.log.calledOnce);
    assert(gen.log.calledWithMatch('Welcome to ds-mod!'));
  });

  it('should not install dependencies', function () {
    assert(gen.installDependencies.callCount === 0);
  });

  it('should create project files', function () {
    assert.file([
      '.editorconfig',
      '.eslintrc',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintrc',
      '.travis.yml',
      'index.js',
      'gulpfile.babel.js',
      'LICENSE.md',
      'package.json',
      'README.md',
      'test.js'
    ]);
  });

  it('should insert full name into LICENSE.md', function () {
    assert.fileContent('LICENSE.md', 'Dustin Specker');
  });

  describe('package.json', function () {
    it('should insert project name', function () {
      assert.fileContent('package.json', '"name": "awesome-mod",');
    });

    it('should insert project description', function () {
      assert.fileContent('package.json', '"description": "An awesome project.",');
    });

    it('should insert project repository url', function () {
      assert.fileContent(
        'package.json',
        '"url": "git+https://github.com/dustinspecker/awesome-mod.git"'
      );
    });

    it('should insert author', function () {
      assert.fileContent('package.json', '"author": "Dustin Specker",');
    });

    it('should insert bugs url', function () {
      assert.fileContent('package.json',
        '"url": "https://github.com/dustinspecker/awesome-mod/issues"'
      );
    });

    it('should insert homepage', function () {
      assert.fileContent('package.json',
        '"homepage": "https://github.com/dustinspecker/awesome-mod#readme",'
      );
    });
  });

  describe('README.md', function () {
    it('should insert project name as title', function () {
      assert.fileContent('README.md', '# awesome-mod');
    });

    it('should insert npm badge', function () {
      assert.fileContent(
        'README.md',
        '[![NPM version](https://badge.fury.io/js/awesome-mod.svg)](https://badge.fury.io/js/awesome-mod)'
      );
    });

    it('should insert Travis badge', function () {
      assert.fileContent(
        'README.md',
        '[![Build Status](https://travis-ci.org/dustinspecker/awesome-mod.svg)](https://travis-ci.org/' +
          'dustinspecker/awesome-mod)'
      );
    });

    it('should insert Coveralls badge', function () {
      assert.fileContent(
        'README.md',
        '[![Coverage Status](https://img.shields.io/coveralls/dustinspecker/awesome-mod.svg)]' +
          '(https://coveralls.io/r/dustinspecker/awesome-mod?branch=master)'
      );
    });

    it('should insert code climate badge', function () {
      assert.fileContent(
        'README.md',
        '[![Code Climate](https://codeclimate.com/github/dustinspecker/awesome-mod/badges/gpa.svg)]' +
          '(https://codeclimate.com/github/dustinspecker/awesome-mod)'
      );
    });

    it('should insert dependencies badge', function () {
      assert.fileContent(
        'README.md',
        '[![Dependencies](https://david-dm.org/dustinspecker/awesome-mod.svg)]' +
          '(https://david-dm.org/dustinspecker/awesome-mod/#info=dependencies&view=table)'
      );
    });

    it('should insert dev dependencies badge', function () {
      assert.fileContent(
        'README.md',
        '[![DevDependencies](https://david-dm.org/dustinspecker/awesome-mod/dev-status.svg)]' +
          '(https://david-dm.org/dustinspecker/awesome-mod/#info=devDependencies&view=table)'
      );
    });

    it('should insert description', function () {
      assert.fileContent('README.md', '> An awesome project.');
    });

    it('should insert install step', function () {
      assert.fileContent('README.md', 'npm install --save awesome-mod');
    });

    it('should insert usage require', function () {
      assert.fileContent('README.md', 'var awesomeMod = require(\'awesome-mod\');');
    });
  });

  describe('test.js', function () {
    it('should require project', function () {
      assert.fileContent('test.js', 'var awesomeMod = require(\'./\')');
    });

    it('should describe project', function () {
      assert.fileContent('test.js', 'describe(\'awesome-mod\', function () {');
    });

    it('should expect to be defined', function () {
      assert.fileContent('test.js', 'expect(awesomeMod()).to.be.defined();');
    });
  });
});
