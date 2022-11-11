import express from 'express';
import db from '../db/database.mjs';
import bodyParser from "body-parser";

// logsRoutes is an instance of the express router
const logsRoutes = express.Router();

logsRoutes.use(bodyParser.urlencoded({ extended: false }));
logsRoutes.use(bodyParser.json());


// get user logs by params (id, date, limit)
logsRoutes.route("/api/users/:_id/logs").get((req, res) => {
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
        const additionalParams = req.url?.split(/\[(.*?)\]/).filter(Boolean);
        const startDate = new Date (additionalParams[1])?.toISOString();
        const endDate = new Date (additionalParams[2]?.replace('&', '')).toISOString();
        const limit =  additionalParams[3]?.replace('&', '');

        const exercisesSelect = startDate && endDate && limit ? "SELECT * FROM exercises WHERE _id = ? and date between ? and ?" : "SELECT * FROM exercises where _id = ?" ;
        const params = startDate && endDate && limit ? [req.params._id, startDate, endDate] : [req.params._id];

        db.all(exercisesSelect, params, (exercisesErr, exercisesRow) => {
          if(limit <= 0 || limit > exercisesRow.length || limit === undefined) {
            res.status(400).json({"error":"Wrong limit"});
            console.error("Wrong limit");
          }
          else {
            if (exercisesErr) {
              res.status(400).json({"error":exercisesErr});
              console.error(exercisesErr);
            }
            else if(!exercisesRow) {
              res.status(400).json({"error":"No logs exist"});
              console.error("No logs exist");
            }
            else {
              let logs = exercisesRow.map((exerciseRow) => ({
                description: exerciseRow.description,
                duration: exerciseRow.duration,
                date: new Date(exerciseRow.date).toDateString(),
              }));
              if(logs.length > limit) {
                logs = logs.slice(0, limit);
              }
              let data = {
                _id: row._id,
                username: row.username,
                count: logs.length,
                log: logs,
              }
              res.json(data);
            }
          }
        });
      }
    });
});

export default logsRoutes;
