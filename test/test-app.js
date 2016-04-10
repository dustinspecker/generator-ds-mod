/* global describe, before, it */
'use strict'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import {join, sep} from 'path'
import sinon from 'sinon'

describe('App Generator with installDependencies', () => {
  let gen

  before(done => {
    helpers
      .run(join(__dirname, '../app'))
      .withOptions({
        'skip-install': false
      })
      .withPrompts({
        projectName: 'awesome-mod',
        description: 'An awesome project.',
        fullName: 'Dustin Specker',
        githubUser: 'dustinspecker',
        email: 'DustinSpecker@DustinSpcker.com',
        url: 'https://github.com/dustinspecker'
      })
      .withGenerators([
        join(__dirname, '../app')
      ])
      .on('ready', generator => {
        gen = generator
        generator.installDependencies = sinon.spy()
      })
      .on('end', done)
  })

  it('should install dependencies', () => {
    assert(gen.installDependencies.calledOnce)
  })
})

describe('App generator default projectName', () => {
  before(done => {
    helpers
      .run(join(__dirname, '../app'))
      .withPrompts({
        description: 'An awesome project.',
        fullName: 'Dustin Specker',
        githubUser: 'dustinspecker',
        email: 'DustinSpecker@DustinSpcker.com',
        url: 'https://github.com/dustinspecker'
      })
      .withGenerators([
        join(__dirname, '../app')
      ])
      .on('end', () => {
        done()
      })
  })

  it('should name app after current directory', () => {
    // Open to suggestions for a better test
    // Not sure how to stub process.cwd without messing up everything else
    // Also, not sure how to mock a module AND have the mock be used with Yeoman's helpers' run function.
    const projectName = process.cwd().split(sep).pop()
    assert.fileContent('package.json', `"name": "${projectName}",`)
  })
})

describe('App generator', () => {
  let gen

  before(done => {
    helpers
      .run(join(__dirname, '../app'))
      .withPrompts({
        projectName: 'awesome-mod',
        description: 'An awesome project.',
        fullName: 'Dustin Specker',
        githubUser: 'dustinspecker',
        email: 'DustinSpecker@DustinSpecker.com',
        url: 'https://github.com/dustinspecker'
      })
      .withGenerators([
        join(__dirname, '../app')
      ])
      .on('ready', generator => {
        gen = generator
        generator.installDependencies = sinon.spy()
        generator.log = sinon.spy()
      })
      .on('end', done)
  })

  it('should welcome user', () => {
    assert(gen.log.calledOnce)
    assert(gen.log.calledWithMatch('Welcome to ds-mod!'))
  })

  it('should not install dependencies', () => {
    assert(gen.installDependencies.callCount === 0)
  })

  it('should create project files', () => {
    assert.file([
      'src/index.js',
      'tests/test.js',
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      '.travis.yml',
      'license.md',
      'package.json',
      'readme.md'
    ])
  })

  it('should insert full name into license.md', () => {
    assert.fileContent('license.md', 'Dustin Specker')
  })

  describe('package.json', () => {
    it('should insert project name', () => {
      assert.fileContent('package.json', '"name": "awesome-mod",')
    })

    it('should insert project description', () => {
      assert.fileContent('package.json', '"description": "An awesome project.",')
    })

    it('should insert project repository url', () => {
      assert.fileContent(
        'package.json',
        '"url": "https://github.com/dustinspecker/awesome-mod.git"'
      )
    })

    it('should insert author\'s name', () => {
      assert.fileContent('package.json', '"name": "Dustin Specker",')
    })

    it('should insert author\'s email', () => {
      assert.fileContent('package.json', '"email": "DustinSpecker@DustinSpecker.com",')
    })

    it('should insert author\'s URL', () => {
      assert.fileContent('package.json', '"url": "https://github.com/dustinspecker"')
    })
  })

  describe('readme.md', () => {
    it('should insert project name as title', () => {
      assert.fileContent('readme.md', '# awesome-mod')
    })

    it('should insert npm badge', () => {
      assert.fileContent(
        'readme.md',
        '[![NPM version](https://badge.fury.io/js/awesome-mod.svg)](https://badge.fury.io/js/awesome-mod)'
      )
    })

    it('should insert Travis badge', () => {
      assert.fileContent(
        'readme.md',
        '[![Build Status](https://travis-ci.org/dustinspecker/awesome-mod.svg)](https://travis-ci.org/' +
          'dustinspecker/awesome-mod)'
      )
    })

    it('should insert Coveralls badge', () => {
      assert.fileContent(
        'readme.md',
        '[![Coverage Status](https://img.shields.io/coveralls/dustinspecker/awesome-mod.svg)]' +
          '(https://coveralls.io/r/dustinspecker/awesome-mod?branch=master)'
      )
    })

    it('should insert code climate badge', () => {
      assert.fileContent(
        'readme.md',
        '[![Code Climate](https://codeclimate.com/github/dustinspecker/awesome-mod/badges/gpa.svg)]' +
          '(https://codeclimate.com/github/dustinspecker/awesome-mod)'
      )
    })

    it('should insert dependencies badge', () => {
      assert.fileContent(
        'readme.md',
        '[![Dependencies](https://david-dm.org/dustinspecker/awesome-mod.svg)]' +
          '(https://david-dm.org/dustinspecker/awesome-mod/#info=dependencies&view=table)'
      )
    })

    it('should insert dev dependencies badge', () => {
      assert.fileContent(
        'readme.md',
        '[![DevDependencies](https://david-dm.org/dustinspecker/awesome-mod/dev-status.svg)]' +
          '(https://david-dm.org/dustinspecker/awesome-mod/#info=devDependencies&view=table)'
      )
    })

    it('should insert description', () => {
      assert.fileContent('readme.md', '> An awesome project.')
    })

    it('should insert install step', () => {
      assert.fileContent('readme.md', 'npm install --save awesome-mod')
    })

    it('should insert usage import', () => {
      assert.fileContent('readme.md', 'import awesomeMod from \'awesome-mod\'')
    })

    it('should insert API', () => {
      assert.fileContent('readme.md', '### awesomeMod()')
    })

    it('should insert copyright info', () => {
      assert.fileContent('readme.md', 'MIT © [Dustin Specker](https://github.com/dustinspecker')
    })
  })

  describe('tests/test.js', () => {
    it('should require project', () => {
      assert.fileContent('tests/test.js', 'import awesomeMod from \'../lib/\'')
    })

    it('should expect to be defined', () => {
      assert.fileContent('tests/test.js', 't.ok(!!awesomeMod())')
    })
  })
})
