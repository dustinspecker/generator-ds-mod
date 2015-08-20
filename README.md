# generator-ds-mod
[![NPM version](https://badge.fury.io/js/generator-ds-mod.svg)](https://badge.fury.io/js/generator-ds-mod) [![Build Status](https://travis-ci.org/dustinspecker/generator-ds-mod.svg)](https://travis-ci.org/dustinspecker/generator-ds-mod) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/generator-ds-mod.svg)](https://coveralls.io/r/dustinspecker/generator-ds-mod?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/generator-ds-mod/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/generator-ds-mod) [![Dependencies](https://david-dm.org/dustinspecker/generator-ds-mod.svg)](https://david-dm.org/dustinspecker/generator-ds-mod/#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/dustinspecker/generator-ds-mod/dev-status.svg)](https://david-dm.org/dustinspecker/generator-ds-mod/#info=devDependencies&view=table)

> Yeoman Generator for creating Node modules

## Usage
Install `generator-ds-mod`:
```
npm install -g yo generator-ds-mod
```

Run `yo ds-mod` to create a module. ds-mod will ask you some questions:

```
[?] What is the project name?
[?] What is the project description?
[?] What is your full name?
[?] What is your GitHub username?
```

and will produce:
```
root/
├── node_modules/
├── src/
│   └── index.js
├── test/
│   └── test.js
├── .editorconfig
├── .eslintrc
├── .gitattributes
├── .gitignore
├── .jscsrc
├── .jshintrc
├── .travis.yml
├── Gulpfile.js
├── LICENSE.md
├── package.json
└── README.md
```

## LICENSE
MIT © [Dustin Specker](https://github.com/dustinspecker)