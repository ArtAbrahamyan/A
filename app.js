var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//var modulesMongo=require('./modules/mongodb');


var app = express();

var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb');
console.log('contect to monguse Db');
var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function (req,res) {

    res.render('index', { title: 'zH' });


});

app.get('/',function (req,res) {
    res.render('/login', { title: 'zH' });
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.listen(3000);
console.log('listen in 3000 ports....');

module.exports = app;
