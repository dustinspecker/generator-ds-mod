/* global describe, it */
'use strict';
import <%= camelCase %> from '../lib/';
import {expect} from 'chai';

describe('<%= projectName %>', () => {
  it('should do something awesome', () => {
    expect(<%= camelCase %>()).to.be.defined();
  });
});
