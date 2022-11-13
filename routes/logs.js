import express from 'express';
// Require our controllers.
import logsController from '../controllers/logsController.js';

// usersRoutes is an instance of the express router
const logsRoutes = express.Router();

/// LOGS ROUTES ///

// GET all user logs from db (from, to, limit).
logsRoutes.get('/api/users/:_id/logs', logsController.getUserLogs);

export default logsRoutes;
