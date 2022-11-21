import db from '../db/db.js';

// logs controllers

const getUserLogs = (req, res, next) => {
  // named placeholders
  const select = 'SELECT * FROM users where _id = :_id';
  const params = [req.params._id];
  const { from, to, limit } = req.query;

  db.get(select, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err });
      console.error(err);
      return next(err);
    } else if (!row) {
      res.status(400).json({ error: 'No such user!' });
      console.error('No such user!');
      return next('No such user');
    } else {
      if (from && to && limit) {
        // regx for corrrect data format
        const regx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (!regx.test(from) && !regx.test(to)) {
          res.status(400).json({ error: "Wrong 'from' and 'to' date format! Valid data format is 'yyyy-mm-dd'" });
          console.error("Wrong 'from' and 'to' date format! Valid data format is 'yyyy-mm-dd'");
          return next("Wrong 'from' and 'to' date format! Valid data format is 'yyyy-mm-dd'");
        }
        if (!regx.test(from)) {
          res.status(400).json({ error: "Wrong 'from' date format! Valid data format is 'yyyy-mm-dd'" });
          console.error("Wrong 'from' date format! Valid data format is 'yyyy-mm-dd'");
          return next("Wrong 'from' date format! Valid data format is 'yyyy-mm-dd'");
        }
        if (!regx.test(to)) {
          res.status(400).json({ error: "Wrong 'to' date format! Valid data format is 'yyyy-mm-dd'" });
          console.error("Wrong 'to' date format! Valid data format is 'yyyy-mm-dd'");
          return next("Wrong  'to' date format! Valid data format is 'yyyy-mm-dd'");
        }
        if (regx.test(from) && regx.test(to)) {
          // named placeholders
          const exercisesSelect = 'SELECT * FROM exercises WHERE _id = :_id and date between :from and :to';
          const params = [req.params._id, new Date(from).toISOString(), new Date(to).toISOString()];

          db.all(exercisesSelect, params, (exercisesErr, exercisesRow) => {
            if (exercisesRow.length === 0) {
              let dataNoLogs = {
                _id: row._id,
                username: row.username,
                count: 0,
                log: [],
              };
              res.json(dataNoLogs);
            } else if (limit < 0 || limit > exercisesRow.length) {
              res.status(400).json({ error: 'Wrong limit!' });
              console.error('Wrong limit!');
              return next('Wrong limit!');
            } else {
              if (exercisesErr) {
                res.status(400).json({ error: exercisesErr });
                console.error(exercisesErr);
                return next(exercisesErr);
              } else {
                let logs = exercisesRow.map((exerciseRow) => ({
                  description: exerciseRow.description,
                  duration: exerciseRow.duration,
                  date: new Date(exerciseRow.date).toDateString(),
                }));

                if (logs.length > limit) {
                  logs = logs.slice(0, limit);
                }

                const sortedLogs = logs.sort((objA, objB) => Number(new Date(objA.date)) - Number(new Date(objB.date)));

                let data = {
                  _id: row._id,
                  username: row.username,
                  from: new Date(from).toDateString(),
                  to: new Date(to).toDateString(),
                  count: sortedLogs.length,
                  log: sortedLogs,
                };

                res.json(data);
                return next(data);
              }
            }
          });
        }
      } else {
        // named placeholders
        const exercisesSelect = 'SELECT * FROM exercises where _id = :_id';
        const params = [req.params._id];

        db.all(exercisesSelect, params, (exercisesErr, exercisesRow) => {
          if (exercisesErr) {
            res.status(400).json({ error: exercisesErr });
            console.error(exercisesErr);
            return next(exercisesErr);
          } else {
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
            };

            res.json(data);
            return next(data);
          }
        });
      }
    }
  });
};

export default {
  getUserLogs,
};
