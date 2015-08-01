/* global describe, before, it */
'use strict';
import {assert, test as helpers} from 'yeoman-generator';
import {join} from 'path';
import sinon from 'sinon';

describe('App Generator with installDependencies', () => {
  let gen;

  before((done) => {
    helpers
      .run(join(__dirname, '../app'))
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
        join(__dirname, '../app')
      ])
      .on('ready', (generator) => {
        gen = generator;
        generator.installDependencies = sinon.spy();
      })
      .on('end', done);
  });

  it('should install dependencies', () => {
    assert(gen.installDependencies.calledOnce);
  });
});

describe('App generator', () => {
  let gen;

  before((done) => {
    helpers
      .run(join(__dirname, '../app'))
      .withPrompts({
        projectName: 'awesome-mod',
        description: 'An awesome project.',
        fullName: 'Dustin Specker',
        githubUser: 'dustinspecker'
      })
      .withGenerators([
        join(__dirname, '../app')
      ])
      .on('ready', (generator) => {
        gen = generator;
        generator.installDependencies = sinon.spy();
        generator.log = sinon.spy();
      })
      .on('end', done);
  });

  it('should welcome user', () => {
    assert(gen.log.calledOnce);
    assert(gen.log.calledWithMatch('Welcome to ds-mod!'));
  });

  it('should not install dependencies', () => {
    assert(gen.installDependencies.callCount === 0);
  });

  it('should create project files', () => {
    assert.file([
      'src/index.js',
      'test/test.js',
      '.editorconfig',
      '.eslintrc',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      '.jscsrc',
      '.jshintrc',
      '.travis.yml',
      'gulpfile.babel.js',
      'LICENSE.md',
      'package.json',
      'README.md'
    ]);
  });

  it('should insert full name into LICENSE.md', () => {
    assert.fileContent('LICENSE.md', 'Dustin Specker');
  });

  describe('gulpfile.babel.js', () => {
    it('should have correct srcFiles', () => {
      assert.fileContent('gulpfile.babel.js', `, srcFiles = 'src/*.js'`);
    });

    it('should have correct testFiles', () => {
      assert.fileContent('gulpfile.babel.js', `, testFiles = 'test/*.js'`);
    });
  });

  describe('package.json', () => {
    it('should insert project name', () => {
      assert.fileContent('package.json', '"name": "awesome-mod",');
    });

    it('should insert project description', () => {
      assert.fileContent('package.json', '"description": "An awesome project.",');
    });

    it('should insert project repository url', () => {
      assert.fileContent(
        'package.json',
        '"url": "git+https://github.com/dustinspecker/awesome-mod.git"'
      );
    });

    it('should insert author', () => {
      assert.fileContent('package.json', '"author": "Dustin Specker",');
    });

    it('should insert bugs url', () => {
      assert.fileContent('package.json',
        '"url": "https://github.com/dustinspecker/awesome-mod/issues"'
      );
    });

    it('should insert homepage', () => {
      assert.fileContent('package.json',
        '"homepage": "https://github.com/dustinspecker/awesome-mod#readme",'
      );
    });
  });

  describe('README.md', () => {
    it('should insert project name as title', () => {
      assert.fileContent('README.md', '# awesome-mod');
    });

    it('should insert npm badge', () => {
      assert.fileContent(
        'README.md',
        '[![NPM version](https://badge.fury.io/js/awesome-mod.svg)](https://badge.fury.io/js/awesome-mod)'
      );
    });

    it('should insert Travis badge', () => {
      assert.fileContent(
        'README.md',
        '[![Build Status](https://travis-ci.org/dustinspecker/awesome-mod.svg)](https://travis-ci.org/' +
          'dustinspecker/awesome-mod)'
      );
    });

    it('should insert Coveralls badge', () => {
      assert.fileContent(
        'README.md',
        '[![Coverage Status](https://img.shields.io/coveralls/dustinspecker/awesome-mod.svg)]' +
          '(https://coveralls.io/r/dustinspecker/awesome-mod?branch=master)'
      );
    });

    it('should insert code climate badge', () => {
      assert.fileContent(
        'README.md',
        '[![Code Climate](https://codeclimate.com/github/dustinspecker/awesome-mod/badges/gpa.svg)]' +
          '(https://codeclimate.com/github/dustinspecker/awesome-mod)'
      );
    });

    it('should insert dependencies badge', () => {
      assert.fileContent(
        'README.md',
        '[![Dependencies](https://david-dm.org/dustinspecker/awesome-mod.svg)]' +
          '(https://david-dm.org/dustinspecker/awesome-mod/#info=dependencies&view=table)'
      );
    });

    it('should insert dev dependencies badge', () => {
      assert.fileContent(
        'README.md',
        '[![DevDependencies](https://david-dm.org/dustinspecker/awesome-mod/dev-status.svg)]' +
          '(https://david-dm.org/dustinspecker/awesome-mod/#info=devDependencies&view=table)'
      );
    });

    it('should insert description', () => {
      assert.fileContent('README.md', '> An awesome project.');
    });

    it('should insert install step', () => {
      assert.fileContent('README.md', 'npm install --save awesome-mod');
    });

    it('should insert usage require', () => {
      assert.fileContent('README.md', `var awesomeMod = require('awesome-mod');`);
    });
  });

  describe('test/test.js', () => {
    it('should require project', () => {
      assert.fileContent('test/test.js', `import awesomeMod from '../lib/';`);
    });

    it('should describe project', () => {
      assert.fileContent('test/test.js', `describe('awesome-mod', () => {`);
    });

    it('should expect to be defined', () => {
      assert.fileContent('test/test.js', 'expect(awesomeMod()).to.be.defined();');
    });
  });
});
