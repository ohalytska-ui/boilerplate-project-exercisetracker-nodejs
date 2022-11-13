import express from 'express';
// Require our controllers.
import exercisesController from '../controllers/exercisesController.js';

// usersRoutes is an instance of the express router
const exercisesRoutes = express.Router();

/// EXERCISES ROUTES ///

// POST all users from db.
exercisesRoutes.post('/api/users/:_id/exercises', exercisesController.addExerciseToUser);

export default exercisesRoutes;
