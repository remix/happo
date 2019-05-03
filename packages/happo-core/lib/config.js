'use strict';

var current = null;

module.exports = {
  get: function () {
    function get() {
      return current;
    }

    return get;
  }(),
  set: function () {
    function set(config) {
      if (current) {
        throw new Error('Cannot set happo config once it has been set!');
      }
      current = config;
    }

    return set;
  }(),
  __setForTestingOnly: function () {
    function __setForTestingOnly(config) {
      current = config;
    }

    return __setForTestingOnly;
  }()
};