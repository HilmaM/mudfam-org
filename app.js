var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var flash = require('connect-flash'); 
var config = require('config-lite')(__dirname); 
var pkg = require('./package');
var easySession = require('easy-session');
 var dataRole = require('./data/role');

var indexRouter = require('./routes/index');
var insurerRouter = require('./routes/insurer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  url: config.mongodb
}));

app.use(easySession.main(session, { rbac: dataRole.roles, maxFreshTimeout: 1500000, ipCheck: true, uaCheck: true }));

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-flash')());

app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/images/products'),
  keepExtensions: true
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

app.use('/', indexRouter);
app.use('/insurer', insurerRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// error page render
app.use(function (err, req, res, next) {
  res.render('error', {
      error: err
  });
});

app.listen(config.port, function () {
    console.log(`${pkg.name.toUpperCase()} version ${pkg.version} listening on port: ${config.port}`);
});

module.exports = app;
