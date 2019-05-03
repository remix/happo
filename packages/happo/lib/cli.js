'use strict';

var crypto = require('crypto');

var commander = require('commander');

var _require = require('happo-core'),
    config = _require.config,
    saveResultsToFile = _require.saveResultsToFile,
    constructUrl = _require.constructUrl;

var initializeConfig = require('./initializeConfig');
var validateConfig = require('./validateConfig');

var _require2 = require('happo-viewer'),
    server = _require2.server,
    uploadLastResult = _require2.uploadLastResult;

var processSerially = require('./processSerially');

config.set(validateConfig(initializeConfig(process.env.HAPPO_CONFIG_FILE)));

function logAndExitWithFailure(error) {
  console.error(error);
  process.exit(1);
}

function exitWithSuccess() {
  process.exit(0);
}

function targetForName(name) {
  var target = config.get().targets.find(function (t) {
    return t.name === name;
  });
  if (!target) {
    logAndExitWithFailure(new Error('Target ' + String(name) + ' not found.'));
  }
  return target;
}

commander.command('run [<target>]').action(function (targetName) {
  var resultPromise = void 0;
  if (targetName) {
    resultPromise = targetForName(targetName).run();
  } else {
    resultPromise = processSerially(config.get().targets, function (target) {
      return target.run();
    }).then(function (results) {
      return results.reduce(function (a, b) {
        return a.merge(b);
      });
    });
  }

  return resultPromise.then(saveResultsToFile).then(exitWithSuccess)['catch'](logAndExitWithFailure);
});

commander.command('review').action(function () {
  server.start(config.get()).then(function () {
    console.log('=> ' + String(constructUrl('/review')));
  });
});

commander.command('debug <target>').action(function (target) {
  targetForName(target).debug();
});

commander.command('review-demo').action(function () {
  // server.start().then(() => {
  //   console.log(`=> ${constructUrl('/review-demo')}`);
  // });
});

commander.command('upload [<triggeredByUrl>]').action(function (triggeredByUrl) {
  uploadLastResult(triggeredByUrl).then(function (url) {
    if (url) {
      console.log(url);
    }
  })['catch'](logAndExitWithFailure);
});

commander.command('upload-test').action(function () {
  var uploader = config.get().uploader();
  uploader.prepare().then(function () {
    uploader.upload({
      body: 'Generated by `happo upload-test`',
      contentType: 'text/plain',
      contentEncoding: 'utf-8',
      fileName: String(crypto.randomBytes(16).toString('hex')) + '.txt'
    }).then(function (url) {
      console.log(url);
    });
  })['catch'](logAndExitWithFailure);
});

module.exports = function () {
  function cli(argv) {
    commander.parse(argv);
    if (!argv.slice(2).length) {
      commander.outputHelp();
    }
  }

  return cli;
}();