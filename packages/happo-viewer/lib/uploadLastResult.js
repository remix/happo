'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fs = require('fs');
var path = require('path');

var ejs = require('ejs');

var _require = require('happo-core'),
    config = _require.config,
    getLastResultSummary = _require.getLastResultSummary,
    pathToSnapshot = _require.pathToSnapshot;

var pageTitle = require('./pageTitle');
var prepareViewData = require('./prepareViewData');

/**
 * Uploads an image of a particular variant (current or previous).
 *
 * @return {Promise}
 */
function uploadImage(_ref) {
  var uploader = _ref.uploader,
      image = _ref.image,
      variant = _ref.variant;

  var fileName = String(image.description) + '_' + String(image.viewportName) + '_' + String(variant) + '.png';
  return uploader.upload({
    contentType: 'image/png',
    fileName: fileName,
    pathToFile: pathToSnapshot(_extends({}, image, {
      fileName: String(variant) + '.png'
    }))
  }).then(function (remoteUrl) {
    /* eslint-disable no-param-reassign */
    image[variant] = encodeURIComponent(fileName);
    image[String(variant) + 'Url'] = remoteUrl;
    /* eslint-enable no-param-reassign */
  });
}

/**
 * Serializes an review page and uploads it. Resolves the promise with a URL to
 * the uploaded file.
 *
 * @return {Promise} that resolves with a URL
 */
function uploadHTMLFile(_ref2) {
  var uploader = _ref2.uploader,
      diffImages = _ref2.diffImages,
      newImages = _ref2.newImages,
      triggeredByUrl = _ref2.triggeredByUrl;

  var template = fs.readFileSync(path.resolve(__dirname, '../views/review.ejs'), 'utf8');
  var title = pageTitle({ diffImages: diffImages, newImages: newImages });
  var html = ejs.render(template, prepareViewData({
    appProps: {
      diffImages: diffImages,
      generatedAt: Date.now(),
      newImages: newImages,
      pageTitle: title,
      triggeredByUrl: triggeredByUrl
    },
    pageTitle: title,
    ogImageUrl: (diffImages[0] || newImages[0]).currentUrl
  }));

  return uploader.upload({
    body: html,
    contentType: 'text/html',
    contentEncoding: 'utf-8',
    fileName: 'index.html'
  });
}

/**
 * @param {String} triggeredByUrl
 * @return {Promise} that resolves with a URL to the html document uploaded to
 *   s3.
 */
module.exports = function () {
  function uploadLastResult(triggeredByUrl) {
    return new Promise(function (resolve, reject) {
      var _getLastResultSummary = getLastResultSummary(),
          diffImages = _getLastResultSummary.diffImages,
          newImages = _getLastResultSummary.newImages;

      if (!diffImages.length && !newImages.length) {
        resolve();
        return;
      }

      var uploader = config.get().uploader();
      uploader.prepare().then(function () {
        var uploadPromises = [];
        diffImages.forEach(function (image) {
          uploadPromises.push(uploadImage({ uploader: uploader, image: image, variant: 'previous' }), uploadImage({ uploader: uploader, image: image, variant: 'current' }));
        });
        newImages.forEach(function (image) {
          uploadPromises.push(uploadImage({ uploader: uploader, image: image, variant: 'current' }));
        });

        return Promise.all(uploadPromises).then(function () {
          uploadHTMLFile({ uploader: uploader, diffImages: diffImages, newImages: newImages, triggeredByUrl: triggeredByUrl }).then(resolve)['catch'](reject);
        });
      })['catch'](reject);
    });
  }

  return uploadLastResult;
}();