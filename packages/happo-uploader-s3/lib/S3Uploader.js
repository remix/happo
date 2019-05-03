'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypto = require('crypto');
var fs = require('fs');

var AWS = require('aws-sdk');

var _process$env = process.env,
    S3_ACCESS_KEY_ID = _process$env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY = _process$env.S3_SECRET_ACCESS_KEY,
    Bucket = _process$env.S3_BUCKET_NAME,
    S3_BUCKET_PATH = _process$env.S3_BUCKET_PATH,
    S3_REGION = _process$env.S3_REGION;


module.exports = function () {
  function S3Uploader() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        debug = _ref.debug;

    _classCallCheck(this, S3Uploader);

    this.debug = debug;
    this.debugLog('Initializing S3 configuration for ' + String(S3_ACCESS_KEY_ID));

    this.s3 = new AWS.S3({
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
      region: S3_REGION || 'us-east-1',
      logger: debug && process.stderr
    });

    this.directory = [S3_BUCKET_PATH, crypto.randomBytes(16).toString('hex')].filter(Boolean).join('/');

    this.debugLog('Setting S3 directory to ' + String(this.directory));
  }

  _createClass(S3Uploader, [{
    key: 'debugLog',
    value: function () {
      function debugLog(message) {
        if (!this.debug) {
          return;
        }

        // We print to stderr to avoid messing with the end result (the link to the
        // uploaded HTML file)
        process.stderr.write(String(message) + '\n');
      }

      return debugLog;
    }()

    /**
     * Creates a bucket (or gets it if already exists).
     *
     * @return {Promise}
     */

  }, {
    key: 'prepare',
    value: function () {
      function prepare() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.debugLog('Checking for bucket ' + String(Bucket));

          _this.s3.headBucket({ Bucket: Bucket }, function (headErr) {
            if (headErr) {
              if (headErr.statusCode === 403) {
                _this.debugLog('Access denied, assuming bucket exists ' + String(Bucket));
                resolve();
                return;
              }

              _this.debugLog('Bucket not found, creating new bucket ' + String(Bucket));
              _this.s3.createBucket({ Bucket: Bucket }, function (createErr) {
                if (createErr) {
                  _this.debugLog('Bucket creation failed ' + String(Bucket));
                  reject(createErr);
                } else {
                  _this.debugLog('Bucket creation successful ' + String(Bucket));
                  resolve();
                }
              });
            } else {
              resolve();
            }
          });
        });
      }

      return prepare;
    }()

    /**
     * Uploads a file stream or a string.
     *
     * @param {string} body
     * @param {string} pathToFile
     * @param {string} contentType
     * @param {string} fileName
     *
     * @return {Promise}
     */

  }, {
    key: 'upload',
    value: function () {
      function upload(_ref2) {
        var _this2 = this;

        var body = _ref2.body,
            pathToFile = _ref2.pathToFile,
            contentType = _ref2.contentType,
            contentEncoding = _ref2.contentEncoding,
            fileName = _ref2.fileName;

        return new Promise(function (resolve, reject) {
          if (!body) {
            body = fs.createReadStream(pathToFile); // eslint-disable-line no-param-reassign
          }
          var uploadParams = {
            Body: body,
            Bucket: Bucket,
            ContentType: contentType,
            ContentEncoding: contentEncoding,
            Key: String(_this2.directory) + '/' + String(fileName)
          };

          _this2.debugLog('Attempting upload');
          _this2.s3.upload(uploadParams, function (err, _ref3) {
            var Location = _ref3.Location;

            if (err) {
              _this2.debugLog('Upload failed');
              reject(err);
            } else {
              resolve(Location);
            }
          });
        });
      }

      return upload;
    }()
  }]);

  return S3Uploader;
}();