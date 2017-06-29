var utils = require('../utils');
var database = require('../database');

exports.checkAuthorizeParams = function(req, res, next) {
    if(!req.query.client_id) {
        return next(utils.missingParameterError('client_id'));
    }
    if (!req.query.redirect_uri) {
        return next(utils.missingParameterError('redirect_uri'));
    }

    // 验证client_id是否正确，并查询应用的详细信息
    database.getAppInfo(req.query.client_id, function(err, ret) {
        if(err) return next(err);

        req.appInfo = ret;
        // 验证redirect_uri是否符合该应用设置的回调地址规则
        database.verifyAppRedirectUri(req.query.client_id, req.query.redirect_uri, function (err, ok) {
        if (err) return next(err);
        if (!ok) {
            return next(utils.redirectUriNotMatchError(req.query.redirect_uri));
        }

        next();
        });
    })


}

// 显示确认界面
exports.showAppInfo = function (req, res, next) {
  res.locals.loginUserId = req.loginUserId;
  res.locals.appInfo = req.appInfo;
  res.render('authorize');
};

// 确认授权
exports.confirmApp = function (req, res, next) {
    database.generateAuthorizationCode(req.loginUserId, req.query.client_id, req.query.redirect_uri, function(err, ret) {
        if(err) return next(err);

        // 跳转回来源应用
    res.redirect(utils.addQueryParamsToUrl(req.query.redirect_uri, {
             code: ret
        }));
    })
}