import express from 'express';

// router is an instance of the express router
const notFound = express.Router();

// catch 404 and forward to error handler
notFound.use('*', (req, res, next) => {
  res.status(404).json({ error: 'Page not found' });
  return next('Page not found');
});

export default notFound;
