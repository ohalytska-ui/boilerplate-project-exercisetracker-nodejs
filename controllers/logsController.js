import db from '../db/db.js';

// logs controllers

const getUserLogs = (req, res, next) => {
  // named placeholders
  const select = 'SELECT * FROM users where _id = :_id';
  const params = [req.params._id];
  const { from, to, limit } = req.query;

  db.get(select, params, (err, row) => {
    if (err) {
      res.render('error', {
        title: JSON.stringify(err.message),
      });
      console.error(err.message);
      return next(err.message);
    } else if (!row) {
      res.render('error', {
        title: 'No such user!',
      });
      console.error('No such user!');
      return next('No such user');
    } else {
      const regx = /^[1-9][0-9]*$/;
      if (limit && !regx.test(limit)) {
        res.render('error', {
          title: 'Wrong limit!',
        });
        console.error('Wrong limit!');
        return next('Wrong limit!');
      } else if (from || to || limit) {
        // regx for corrrect data format
        const regx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (from && !regx.test(from) && to && !regx.test(to)) {
          res.render('error', {
            title: "Wrong 'from' and 'to' date format! Valid data format is 'yyyy-mm-dd'",
          });
          console.error("Wrong 'from' and 'to' date format! Valid data format is 'yyyy-mm-dd'");
          return next("Wrong 'from' and 'to' date format! Valid data format is 'yyyy-mm-dd'");
        }
        if (from && !regx.test(from)) {
          res.render('error', {
            title: "Wrong 'from' date format! Valid data format is 'yyyy-mm-dd'",
          });
          console.error("Wrong 'from' date format! Valid data format is 'yyyy-mm-dd'");
          return next("Wrong 'from' date format! Valid data format is 'yyyy-mm-dd'");
        }
        if (to && !regx.test(to)) {
          res.render('error', {
            title: "Wrong 'to' date format! Valid data format is 'yyyy-mm-dd'",
          });
          console.error("Wrong 'to' date format! Valid data format is 'yyyy-mm-dd'");
          return next("Wrong 'to' date format! Valid data format is 'yyyy-mm-dd'");
        }
        if (regx.test(from) || regx.test(to) || limit) {
          // named placeholders
          let exercisesSelect = '';
          let params = [];
          if (to && from) {
            exercisesSelect = 'SELECT * FROM exercises WHERE _id = :_id AND date >= :from AND date <= :to';
            params = [req.params._id, new Date(from)?.toISOString(), new Date(to)?.toISOString()];
          } else if (to) {
            exercisesSelect = 'SELECT * FROM exercises WHERE _id = :_id AND date <= :to';
            params = [req.params._id, new Date(to)?.toISOString()];
          } else if (from) {
            exercisesSelect = 'SELECT * FROM exercises WHERE _id = :_id AND date >= :from';
            params = [req.params._id, new Date(from)?.toISOString()];
          } else if (limit && !from && !to) {
            exercisesSelect = 'SELECT * FROM exercises WHERE _id = :_id';
            params = [req.params._id];
          }

          db.all(exercisesSelect, params, (exercisesErr, exercisesRow) => {
            if (exercisesRow.length === 0) {
              let dataNoLogs = {
                _id: row._id,
                username: row.username,
                count: 0,
                log: [],
              };

              res.render('logs', {
                title: 'Exercise tracker',
                username: dataNoLogs.username,
                userLogs: '[]',
              });
              return next(dataNoLogs);
            }
            if (limit > exercisesRow.length) {
              res.render('error', {
                title: 'Wrong limit!',
              });
              console.error('Wrong limit!');
              return next('Wrong limit!');
            } else {
              if (exercisesErr) {
                res.render('error', {
                  title: JSON.stringify(exercisesErr),
                });
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
                  from: from ? new Date(from).toDateString() : 'No date',
                  to: to ? new Date(to).toDateString() : 'No date',
                  count: sortedLogs.length,
                  log: sortedLogs,
                };

                res.render('logs', {
                  title: 'Exercise tracker',
                  username: data.username,
                  userLogs: JSON.stringify(data.log),
                });
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
            res.render('error', {
              title: JSON.stringify(exercisesErr),
            });
            console.error(exercisesErr);
            return next(exercisesErr);
          } else {
            let logs = exercisesRow.map((exerciseRow) => ({
              description: exerciseRow.description,
              duration: exerciseRow.duration,
              date: new Date(exerciseRow.date).toDateString(),
            }));

            const sortedLogs = logs.sort((objA, objB) => Number(new Date(objA.date)) - Number(new Date(objB.date)));

            let data = {
              _id: row._id,
              username: row.username,
              count: sortedLogs.length,
              log: sortedLogs,
            };

            res.render('logs', {
              title: 'Exercise tracker',
              username: data.username,
              userLogs: JSON.stringify(data.log),
            });
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
