import express from 'express';
import path from 'path';

// router is an instance of the express router
const mainRoutes = express.Router();

/// MAIN ROUTES ///

// root endpoint
mainRoutes.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

export default mainRoutes;
