var APICleint = require('../api-client');

var client = new APICleint({
    appKey: 'a10086',
    appSecret: 'xffcncgmveu6slxg',
    callbackUrl: 'http://127.0.0.1:3000/example/auth/callback'
})

exports.requestAuth = function (req, res, next) {
  res.redirect(client.getRedirectUrl());
};

exports.authCallback = function (req, res, next) {
  client.requestAccessToken(req.query.code, function (err, ret) {
    if (err) return res.send(err.toString());

    // 显示授权成功页面
    console.log(ret);
    res.redirect('/example');
  });
};