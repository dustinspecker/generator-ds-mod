'use strict';
import camelCase from 'camelcase';
import generator from 'yeoman-generator';
import {join, sep} from 'path';
import yosay from 'yosay';

module.exports = generator.Base.extend({
  prompting() {
    const done = this.async();

    this.log(yosay('Welcome to ds-mod!'));

    this.prompt([
      {
        name: 'projectName',
        message: 'What is the project name?',
        default: process.cwd().split(sep).pop()
      },
      {
        name: 'description',
        message: 'What is the project description?'
      },
      {
        name: 'fullName',
        store: true,
        message: 'What is your full name?',
        default: this.config.get('fullName')
      },
      {
        name: 'githubUser',
        store: true,
        message: 'What is your GitHub username?',
        default: this.config.get('githubUser')
      },
      {
        name: 'email',
        store: true,
        message: 'What is your email?',
        default: this.config.get('email')
      },
      {
        name: 'url',
        store: true,
        message: 'What is your URL?',
        default: this.config.get('url')
      }
    ], props => {
      props.camelCase = camelCase(props.projectName);
      this.props = props;
      done();
    });
  },

  writing() {
    const self = this;

    function copy(file) {
      let dest, src;

      if (typeof file === 'string') {
        return self.copyFile(file);
      }

      // if file is an object
      src = Object.keys(file)[0];
      dest = file[src];
      self.copyFile(src, dest);
    }

    [
      {gitignore: '.gitignore'},
      {npmignore: '.npmignore'},
      '.travis.yml',
      '_gulpfile.babel.js',
      {'index.js': join('src', 'index.js')},
      '_LICENSE.md',
      '_package.json',
      '_README.md',
      {'_test.js': join('test', 'test.js')}
    ].forEach(copy);

    // use the project's files instead of the template directory
    // go up one directory because compiled code goes into ../../app/
    self.sourceRoot(join(__dirname, '../'));
    [
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.gitattributes',
      '.jscsrc',
      '.jshintrc'
    ].forEach(copy);
  },

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({bower: false});
    }
  },

  /**
   * Copy files
   * @param {String} src - template source name to copy
   * @param {String} [dest] - destination name to copy source to
   */
  copyFile(src, dest = src) {
    // yeoman runs all methods by default
    // this prevents yeoman from executing this as part of the context loop
    if (arguments.length === 0) {
      return;
    }

    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest.replace(/^_/, '')),
      this.props
    );
  }
});
