var config = require('./config');
var _ = require('lodash');

exports.createMongooseError = function (message, code) {
  return {
    code: code || config.error.mongoose.code,
    message: message || config.error.mongoose.message
  }
};

exports.createServiceError = function (message, code) {
  return {
    code: code || config.error.service.code,
    message: message || config.error.service.message
  }
};

exports.createError = function (message, code) {
  return {
    code: code,
    message: message
  }
};