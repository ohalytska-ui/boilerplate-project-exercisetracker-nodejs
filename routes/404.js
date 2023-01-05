import express from 'express';

// router is an instance of the express router
const notFound = express.Router();

/// ERRORS ROUTES ///

// catch 404 and forward to error handler
notFound.use(function (_, res) {
  res.status(404);
  res.render('error', {
    title: 'Page not found!',
  });
});

export default notFound;
