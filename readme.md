# generator-ds-mod
[![NPM version](https://badge.fury.io/js/generator-ds-mod.svg)](https://badge.fury.io/js/generator-ds-mod) [![Build Status](https://travis-ci.org/dustinspecker/generator-ds-mod.svg)](https://travis-ci.org/dustinspecker/generator-ds-mod) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/generator-ds-mod.svg)](https://coveralls.io/r/dustinspecker/generator-ds-mod?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/generator-ds-mod/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/generator-ds-mod) [![Dependencies](https://david-dm.org/dustinspecker/generator-ds-mod.svg)](https://david-dm.org/dustinspecker/generator-ds-mod/#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/dustinspecker/generator-ds-mod/dev-status.svg)](https://david-dm.org/dustinspecker/generator-ds-mod/#info=devDependencies&view=table)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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
├── .travis.yml
├── license.md
├── package.json
└── readme.md
```

## LICENSE
MIT © [Dustin Specker](https://github.com/dustinspecker)
