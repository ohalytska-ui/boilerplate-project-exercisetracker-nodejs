import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';

// routes
import usersRoutes from './routes/users.js';
import exercisesRoutes from './routes/exercises.js';
import logsRoutes from './routes/logs.js';
import mainRoutes from './routes/index.js';
import errorRoutes from './routes/404.js';

// server port
const PORT = process.env.PORT || 3001;

// view engine setup
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression()); // Compress all routes

// add routes
app.use(usersRoutes);
app.use(exercisesRoutes);
app.use(logsRoutes);
app.use(mainRoutes);
app.use(errorRoutes);

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

export default app;
