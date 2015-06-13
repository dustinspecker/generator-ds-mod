/* global describe, it */
'use strict';
var <%= camelCase %> = require('./')
  , expect = require('chai').expect;

describe('<%= projectName %>', function () {
  it('should do something awesome', function () {
    expect(<%= camelCase %>()).to.be.defined();
  });
});
