import express from 'express';
import db from '../db/database.mjs';
import bodyParser from "body-parser";

// logsRoutes is an instance of the express router
const logsRoutes = express.Router();

logsRoutes.use(bodyParser.urlencoded({ extended: false }));
logsRoutes.use(bodyParser.json());


// get user logs by params (id, date, limit)
logsRoutes.route("/api/users/:_id/logs").get((req, res) => {
    //console.log('here', req.url);
    
    const select = "SELECT * FROM users where _id = ?";
    const params = [req.params._id];
    db.get(select, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err});
        console.error(err);
      }
      else if(!row) {
        res.status(400).json({"error":"No such user"});
        console.error("No such user");
      }
      else {
        const exercisesSelect = "SELECT * FROM exercises where _id = ?";
        const params = [row._id];
        db.all(exercisesSelect, params, (exercisesErr, exercisesRow) => {
          if (exercisesErr) {
            res.status(400).json({"error":exercisesErr});
            console.error(exercisesErr);
          }
          else if(!exercisesRow) {
            res.status(400).json({"error":"No logs exist"});
            console.error("No logs exist");
          }
          else {
            const logs = exercisesRow.map((exerciseRow) => ({
              description: exerciseRow.description,
              duration: exerciseRow.duration,
              date: exerciseRow.date,
            }));
            let data = {
              _id: row._id,
              username: row.username,
              count: exercisesRow.length,
              log: logs,
            }
            res.json(data);
          }
        });
      }
    });
});

export default logsRoutes;
