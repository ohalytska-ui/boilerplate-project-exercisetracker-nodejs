import express from 'express';
import cors from 'cors';;
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import { fileURLToPath } from 'url';

import usersRoutes from "./routes/users.mjs";
import exercisesRoutes from "./routes/exercises.mjs";
import logsRoutes from "./routes/logs.mjs";

// server port
const PORT = process.env.PORT || 3000;
// dirname
const dirname = fileURLToPath(new URL('.', import.meta.url));

// view engine setup
dotenv.config();
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(usersRoutes);
app.use(exercisesRoutes);
app.use(logsRoutes);

// root endpoint
app.get('/', (req, res) => {
  res.sendFile(dirname + '/views/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({"error":"Page not found"});
  console.log("Page not found");
  next("Page not found");
});

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
