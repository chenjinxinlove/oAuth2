
var clone = require('clone');
var parseUrl = require('url').parse;
var formatUrl = require('url').format;
var utils = module.exports = exports = clone(require('lei-utils'));

utils.createApiError = function (code, msg) {
    var err = new Error(msg);
    err.error_code = code;
    err.error_message = msg;
    return err;
}

// 缺少参数错误

utils.missingParameterError = function(name) {
    return utils.createApiError('MISSING_PARAMETER', '缺少参数`' + name + '`');
};

// 回调地址不正确错误

utils.redirectUriNotMatchError = function (url) {
    return utils.createApiError('REDIRET_URI_NOT_MATCH', '回调地址不正确：' + url);
}

// 参数错误
utils.invalidParameterError = function (name) {
  return utils.createApiError('INVALID_PARAMETER', '参数`' + name + '`不正确');
};

// 将参数添加到URL
utils.addQueryParamsToUrl = function (url, params) {
  var info = parseUrl(url, true);
  for (var i in params) {
    info.query[i] = params[i];
  }
  delete info.search;
  return formatUrl(info);
};