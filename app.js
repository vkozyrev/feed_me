'use strict'

// services
  var bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , express = require('express')
    , ExtractJwt = require('passport-jwt').ExtractJwt
    , favicon = require('serve-favicon')
    , JwtStrategy = require('passport-jwt').Strategy
    , logger = require('morgan')
    , passport = require('passport')
    , path = require('path')
    , session = require('express-session')
    , validation = require('express-validation')
    
// requires
    , routes = require('./routes/index')
    , userRoutes = require('./routes/user')
    , registerRoutes = require('./routes/register')
    , models = require('./models')

// variables
    , app = express()
    , swig = require('swig');

// Swig Template
app.engine('html', swig.renderFile);

// view engine setup
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1) // trust first proxy 
/*
app.use(session({
  secret: 'kjT928(nd$N8s',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
*/
app.use(passport.initialize());
//app.use(passport.session());
//passport.use(models.User.createStrategy());
var options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeader();
options.secretOrKey = 'secret';
options.issuer = "accounts.examplesoft.com";
options.audience = "yoursite.net";
passport.use(new JwtStrategy(options, function (jwt_payload, done) {
  models.User.findOne({ where: { id: jwt_payload.sub }})
  .then(function (user) {
    if (user) { done(null, user); }
    else { done(null, false); }
  })
  .catch(function (error) {
    done(error, false);
  });
}));
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

app.use('/', routes);
app.use('/', registerRoutes);
app.use('/user', userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    if (err instanceof validation.ValidationError) return res.status(err.status).json(err);
    console.log(err);
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
  if (err instanceof validation.ValidationError) return res.status(err.status).json(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
