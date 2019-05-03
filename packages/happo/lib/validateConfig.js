'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function fail(message) {
  /* eslint-disable no-console */
  console.error('Happo config validation failed:');
  console.error(message);
  process.exit(1);
}

function validateConfig(config) {
  if (!config) {
    fail('no config found');
  }

  var targets = config.targets;

  if (targets && !Array.isArray(targets)) {
    fail('Expected `targets` to be an array. Found ' + (typeof targets === 'undefined' ? 'undefined' : _typeof(targets)) + ' instead.');
  }

  var nameSet = Object.create(null);

  targets.forEach(function (target, index) {
    if (!target) {
      fail('Target must be an object. Found ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' at index ' + String(index) + ' instead.');
    }
    if (!target.name) {
      fail('Target at index ' + String(index) + ' did not have a `name`.');
    }
    if (target.name in nameSet) {
      fail('Multiple targets found with name \'' + String(target.name) + '\'. Name must be unique.');
    }
    nameSet[target.name] = true;
    if (typeof target.run !== 'function') {
      fail('Target ' + String(target.name) + ' did not have a `run` method.');
    }
    if (typeof target.debug !== 'function') {
      fail('Target ' + String(target.name) + ' did not have a `debug` method.');
    }
  });

  return config;
}

module.exports = validateConfig;