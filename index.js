var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
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
var userRouter = require('./routes/articles');

app.use('/',indexRouter);
app.use('/articles',userRouter);

app.listen(3000);
