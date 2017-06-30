module.exports = function(app) {
  var middlewares = require('../middle');
  var utils = require('../utils');
  
  // oauth2授权
  var authorize = require('./authorize');
    app.get('/OAuth2/authorize', middlewares.ensureLogin, authorize.checkAuthorizeParams, authorize.showAppInfo);
    app.post('/OAuth2/authorize', middlewares.ensureLogin, middlewares.postBody, authorize.checkAuthorizeParams, authorize.confirmApp);

    // 模拟客户端获得授权码
  var client = require('./client');
  // app.get('/example/auth', client.requestAuth);
  app.get('/example/auth/callback', client.authCallback);
}