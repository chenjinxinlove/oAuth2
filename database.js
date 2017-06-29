var utils = require('./utils');
var database = module.exports;


// 获取应用信息
exports.getAppInfo = function (id, callback) {
  callback(null, {
    id: id,
    name: 'Node.js实战',
    description: '专注Node.js实战二十年',
    secret: 'xffcncgmveu6slxg',
    redirectUri: 'http://127.0.0.1:3000/example/auth/callback'
  });
};

// 验证应用的回调URL是否合法
exports.verifyAppRedirectUri = function (clientId, url, callback) {
  database.getAppInfo(clientId, function (err, info) {
    if (err) return callback(err);
    if (!info) return callback(utils.invalidParameterError('client_id'));

    callback(null, info.redirectUri === url);
  });
};


var dataAuthorizationCode = {};
// 生成授权Code
exports.generateAuthorizationCode = function (userId, clientId, redirectUri, callback) {
  var code = utils.randomString(20);
  dataAuthorizationCode[code] = {
    clientId: clientId,
    userId: userId
  };
  callback(null, code);
};