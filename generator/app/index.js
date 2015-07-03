'use strict';
import {Base} from 'yeoman-generator';
import camelCase from 'camelcase';
import {join} from 'path';
import yosay from 'yosay';

export default class Generator extends Base {
  constructor(...args) {
    super(...args);
  }

  get prompting() {
    return function () {
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
      ], (props) => {
        props.camelCase = camelCase(props.projectName);
        this.props = props;
        done();
      });
    };
  }

  get writing() {
    return function () {
      var self = this;

      function copy(file) {
        var dest, src;

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
        '.travis.yml',
        'gulpfile.babel.js',
        'index.js',
        '_LICENSE.md',
        '_package.json',
        '_README.md',
        '_test.js'
      ].forEach(copy);

      // use the project's files instead of the template directory
      // go up one directory because compiled code goes into ../../app/
      self.sourceRoot(join(__dirname, '../'));
      [
        '.editorconfig',
        '.eslintrc',
        '.gitattributes',
        '.jscsrc',
        '.jshintrc'
      ].forEach(copy);
    };
  }

  get install() {
    return function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    };
  }

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
  }
}
