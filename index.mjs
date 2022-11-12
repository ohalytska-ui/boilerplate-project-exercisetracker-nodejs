import express from 'express';
import cors from 'cors';;
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.mjs";
import exercisesRoutes from "./routes/exercises.mjs";
import logsRoutes from "./routes/logs.mjs";
import mainRouters from "./routes/index.mjs";

// server port
const PORT = process.env.PORT || 3000;

// view engine setup
dotenv.config();
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add routes
app.use(usersRoutes);
app.use(exercisesRoutes);
app.use(logsRoutes);
app.use(mainRouters);

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});

export default app;
