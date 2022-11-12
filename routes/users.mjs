import express from 'express';
// Require our controllers.
import usersController from '../controllers/usersController.mjs';

// usersRoutes is an instance of the express router
const usersRoutes = express.Router();

/// USERS ROUTES ///

// GET all users from db.
usersRoutes.get("/api/users", usersController.getUsers);

// POST add new user.
usersRoutes.post("/api/users", usersController.addUser);

export default usersRoutes;
