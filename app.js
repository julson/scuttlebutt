const express = require('express');
const logger = require('morgan');
const user_controller = require('./api/controllers/users');


const app = express();
app.use(logger('dev'));

app.use(express.json());
app.use('/users', user_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('Something bad happened'); //TODO: better message
});

module.exports = app;
