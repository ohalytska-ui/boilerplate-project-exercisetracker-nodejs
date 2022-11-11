import express from 'express';
import cors from 'cors';;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import usersRoutes from "./routes/users.mjs";
import exercisesRoutes from "./routes/exercise.mjs";
import logsRoutes from "./routes/logs.mjs";

// server port
const PORT = process.env.PORT || 3000;
// diename
const dirname = fileURLToPath(new URL('.', import.meta.url));

dotenv.config();
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(usersRoutes);
app.use(exercisesRoutes);
app.use(logsRoutes);

// root endpoint
app.get('/', (req, res) => {
  res.sendFile(dirname + '/views/index.html');
});

// default response for any other request
app.get('*', (req, res) => {
  res.status(404).json({"error":"Page not found"});
  console.log("Page not found");
});

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
