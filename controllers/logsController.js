import db from '../db/database.js';

// logs controllers

const getUserLogs = (req, res) => {
  // named placeholders
  const select = "SELECT * FROM users where _id = :_id";
  const params = [req.params._id];
  const { from, to, limit } = req.query;

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
      if(from ?? to ?? limit)
      {
        // named placeholders
        const exercisesSelect =  "SELECT * FROM exercises WHERE _id = :_id and date between :from and :to";
        const params = [req.params._id, new Date(from).toISOString(), new Date(to).toISOString()];

        db.all(exercisesSelect, params, (exercisesErr, exercisesRow) => {
          if(exercisesRow.length === 0)
          {
            let dataNoLogs = {
              _id: row._id,
              username: row.username,
              count: 0,
              log: [],
            }
            res.json(dataNoLogs);
          }

          else if(limit <= 0 || limit > exercisesRow.length) {
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
                from: new Date(from).toDateString(),
                to: new Date(to).toDateString(),
                count: logs.length,
                log: logs,
              }

              res.json(data);
            }
          }
        });
      }
      else
      {
        // named placeholders
        const exercisesSelect = "SELECT * FROM exercises where _id = :_id" ;
        const params = [req.params._id];

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
            let logs = exercisesRow.map((exerciseRow) => ({
              description: exerciseRow.description,
              duration: exerciseRow.duration,
              date: new Date(exerciseRow.date).toDateString(),
            }));

            let data = {
              _id: row._id,
              username: row.username,
              count: logs.length,
              log: logs,
            }

            res.json(data);
          }
        });
      }
    }
  });
};

export default {
  getUserLogs,
};
