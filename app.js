var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var sessionexpress = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongooseStore = require('mongoose-store')(sessionexpress);



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var uri = "mongodb://sajan:sajan123@proximus.modulusmongo.net:27017/igetew9A";
//var urilocal = "mongodb://localhost:27017/onlinenotes";
//mongoose.connect('mongodb://localhost:27017/onlinenotes');
mongoose.connect(uri);

var mongooseStore = new MongooseStore({
    url: urilocal
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionexpress({
    secret:'xsajanxxsh',
    cookie:{maxAge:600000},
    store: sessionexpress.MemoryStore()
}));

//app.use(sessionexpress({secret:'xsajanxxsh', maxAge:10000}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
