// ======= Starter Code ========
// TODO: delete stuff we don't need
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let testAPIRouter = require('./routes/testAPI')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/testAPI', testAPIRouter)
// ========================================

// Initialize firebase app
let firebase = require('firebase-admin');

const key_path = "./cs-35l-cooking-app-firebase-adminsdk-pfw6m-00878e5a37.json";
const db_url = "https://cs-35l-cooking-app-default-rtdb.firebaseio.com";

let serviceAccount = require(key_path);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: db_url
});

// http://URL/recipe/...
let recipe_router = require('./routes/recipe');
app.use('/recipe', express.json());
app.use('/recipe', recipe_router);

let ingredients_router = require('./routes/ingredients');
app.use('/ingredients', ingredients_router);

let new_recipe_router = require('./routes/new_recipe');
app.use('/newrecipe', express.json());
app.use('/newrecipe', new_recipe_router);

let new_account_router = require('./routes/new_account');
app.use('/newuser', express.json());
app.use('/newuser', new_account_router);

// Run Tests
//require('./tests/test_recipe_database');
//require('./tests/test_user_database');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
