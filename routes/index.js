import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// dirname
const dirname = fileURLToPath(new URL('.', import.meta.url));

// router is an instance of the express router
const mainRouters = express.Router();

// root endpoint
mainRouters.get('/', (req, res) => {
  res.sendFile(path.resolve(dirname + '../views/index.html'));
});

// catch 404 and forward to error handler
mainRouters.use(function (req, res, next) {
  res.status(404).json({ error: 'Page not found' });
  console.log('Page not found');
  next('Page not found');
});

export default mainRouters;
