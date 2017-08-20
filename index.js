var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');


//init app 
var app = express();

//Load View Engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

// Body parse Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')))

var indexRouter = require('./routes/index');
var articleRouter = require('./routes/articles');
var userRouter = require('./routes/users');
app.use('/',indexRouter);
app.use('/articles',articleRouter);
app.use('/users',userRouter);

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.listen(3000);
