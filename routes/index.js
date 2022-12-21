import express from 'express';

// router is an instance of the express router
const mainRoutes = express.Router();

/// MAIN ROUTES ///

// root endpoint
mainRoutes.get('/', (_, res) => {
  // Rendering our web page i.e. index.ejs and passing title variable through it
  res.render('index', {
    title: 'Exercise tracker',
  });
});

export default mainRoutes;
