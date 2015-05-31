'use strict';
var camelCase = require('camelcase')
  , yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , Generator;

Generator = module.exports = yeoman.generators.Base.extend();

Generator.prototype.prompting = function () {
  var done = this.async();

  this.log(yosay('Welcome to ds-mod!'));

  this.prompt([
    {
      name: 'projectName',
      message: 'What is the project name?'
    },
    {
      name: 'description',
      message: 'What is the project description?'
    },
    {
      name: 'fullName',
      message: 'What is your full name?'
    },
    {
      name: 'githubUser',
      message: 'What is your GitHub username?'
    }
  ], function (props) {
    props.camelCase = camelCase(props.projectName);
    this.props = props;
    done();
  }.bind(this));
};

Generator.prototype.writing = function () {
  [
    '.editorconfig',
    '.eslintrc',
    '.gitattributes',
    {gitignore: '.gitignore'},
    '.jscsrc',
    '.jshintrc',
    '.travis.yml',
    'index.js',
    'Gulpfile.js',
    '_LICENSE.md',
    '_package.json',
    '_README.md',
    '_test.js'
  ].forEach(function (file) {
    var dest, src;

    if (typeof file === 'string') {
      return this.copyFile(file);
    }

    // if file is an object
    src = Object.keys(file)[0];
    dest = file[src];
    this.copyFile(src, dest);
  }.bind(this));
};

Generator.prototype.install = function () {
  if (!this.options['skip-install']) {
    this.installDependencies();
  }
};

/**
 * Copy files
 * @param {String} src - template source to copy
 * @param {String} [dest] - destination to copy source to
 */
Generator.prototype.copyFile = function (src, dest) {
  // yeoman runs all methods by default
  // this prevents yeoman from executing this as part of the context loop
  if (arguments.length === 0) {
    return;
  }

  // if dest isn't set, assume copy to same file name
  dest = dest || src;

  // if original src started with an '_' (template file)
  // then strip away '_' prefix for dest
  if (dest.indexOf('_') === 0) {
    dest = dest.substr(1, dest.length);
  }

  this.fs.copyTpl(
    this.templatePath(src),
    this.destinationPath(dest),
    this.props
  );
};
