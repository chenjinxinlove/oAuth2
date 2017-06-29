var bodyParser = require('body-parser');
var connect = require('connect');
var multipart = require('connect-multiparty');

// 检测用户是否已登录

exports.ensureLogin= function (req, res, next) {
    req.loginUserId = 'glen';
    next();
};

// 解析请求Body部分
var postBody = connect();
postBody.use(bodyParser.json());
postBody.use(bodyParser.urlencoded({extended: true}));
postBody.use(multipart());
exports.postBody = postBody;



exports.extendAPIOutput = function (req, res, next) {
    res.apiSuccess = function (data) {
        res.json({
            status: 'OK',
            result: data
        })
    }
    res.apiError = function (err) {
        res.json({
            status: 'Error',
            error_code: err.error_code || 'UNKOWN',
            error_messagge: err.error_messagge || err.toString()
        });
    };
    next();   
}

exports.apiErrorHandle = function (err, req, res, next) {
    console.error((err && err.stack) || err.toString());

    if(typeof res.apiError === 'function') {
        return res.apiError(err);
    }

    next();
}