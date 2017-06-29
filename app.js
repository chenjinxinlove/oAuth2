var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');


var middle = require('./middle');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');







app.use(middle.extendAPIOutput);

// app.use('/api', routes);
require('./routes')(app);

app.use(middle.apiErrorHandle);

module.exports = app;
