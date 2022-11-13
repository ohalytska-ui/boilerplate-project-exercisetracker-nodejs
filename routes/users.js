import express from 'express';
// Require our controllers.
import usersController from '../controllers/usersController.js';

// usersRoutes is an instance of the express router
const usersRoutes = express.Router();

/// USERS ROUTES ///

// GET user by id.
usersRoutes.get('/api/user/:_id', usersController.getUserById);

// GET all users from db.
usersRoutes.get('/api/users', usersController.getUsers);

// POST add new user.
usersRoutes.post('/api/users', usersController.addUser);

export default usersRoutes;
