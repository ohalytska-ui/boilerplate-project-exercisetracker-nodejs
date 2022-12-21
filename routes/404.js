import express from 'express';
import createError from 'http-errors';

// router is an instance of the express router
const notFound = express.Router();

/// ERRORS ROUTES ///

// catch 404 and forward to error handler
notFound.use(function (_, res, next) {
  res.render('error', {
    title: 'Page not found!',
  });
  return next(createError(404));
});

export default notFound;
