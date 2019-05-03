'use strict';

var path = require('path');

var _require = require('happo-core'),
    getLastResultSummary = _require.getLastResultSummary,
    pathToSnapshot = _require.pathToSnapshot;

var pageTitle = require('./pageTitle');
var prepareViewData = require('./prepareViewData');
var reviewDemoData = require('./reviewDemoData');

function reviewImageUrl(image, fileName) {
  var pathToFile = pathToSnapshot(Object.assign({}, image, { fileName: fileName }));
  return '/resource?file=' + String(encodeURIComponent(pathToFile));
}

function isValidResource(file, options) {
  return file.startsWith(options.snapshotsFolder);
}

function createApp(options) {
  var express = require('express'); // eslint-disable-line global-require

  var app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, '../views'));
  app.use(express['static'](path.resolve(__dirname, '../public')));
  (options.publicDirectories || []).forEach(function (directory) {
    app.use(express['static'](path.join(process.cwd(), directory)));
  });

  app.get('/resource', function (request, response) {
    var file = request.query.file;
    if (file.startsWith('http')) {
      response.redirect(file);
    } else if (isValidResource(file, options)) {
      response.sendFile(file, { root: process.cwd() });
    } else {
      response.sendStatus(403);
    }
  });

  app.get('/review', function (request, response) {
    var resultSummary = getLastResultSummary();
    var title = pageTitle(resultSummary);

    /* eslint-disable no-param-reassign */
    resultSummary.newImages.forEach(function (img) {
      img.current = reviewImageUrl(img, 'current.png');
    });
    resultSummary.diffImages.forEach(function (img) {
      img.current = reviewImageUrl(img, 'current.png');
      img.previous = reviewImageUrl(img, 'previous.png');
    });
    /* eslint-enable no-param-reassign */

    response.render('review', prepareViewData({
      ogImageUrl: '',
      pageTitle: title,
      appProps: Object.assign({}, resultSummary, {
        pageTitle: title
      })
    }));
  });

  app.get('/review-demo', function (request, response) {
    var title = pageTitle(reviewDemoData);
    response.render('review', prepareViewData({
      ogImageUrl: '',
      pageTitle: title,
      appProps: Object.assign({}, reviewDemoData, {
        pageTitle: title,
        generatedAt: Date.now()
      })
    }));
  });
  return app;
}

module.exports = {
  start: function () {
    function start(options) {
      return new Promise(function (resolve) {
        var app = createApp(options);
        var expressServer = app.listen(options.port, options.bind, function () {
          console.log('Happo Viewer listening on ' + String(options.port));
          resolve({ expressServer: expressServer });
        });
      });
    }

    return start;
  }()
};