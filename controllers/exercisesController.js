import db from '../db/db.js';

// exercises controllers

const addExerciseToUser = (req, res, next) => {
  let errors = [];

  if (!req.body.description) {
    errors.push('No description specified!');
  }

  if (!req.body.duration) {
    errors.push('No duration specified!');
  }

  if (errors.length) {
    res.status(400);
    res.render('error', {
      title: JSON.stringify(errors.join(',')),
    });
    console.error(errors);
    return next(errors);
  }

  if (req.params._id) {
    // named placeholders
    const select = 'SELECT * FROM users where _id = :_id';
    const params = [req.params._id];

    db.get(select, params, (err, row) => {
      if (err) {
        res.status(400);
        res.render('error', {
          title: JSON.stringify(err.message),
        });
        console.error(err.message);
        return next(err.message);
      } else if (!row) {
        res.status(400);
        res.render('error', {
          title: 'No such user!',
        });
        console.error('No such user!');
        return next('No such user!');
      } else {
        const data = {
          _id: req.params._id,
          username: row.username,
          description: req.body.description,
          duration: Number(req.body.duration),
          date: req.body?.date ? new Date(req.body?.date).toISOString() : new Date().toISOString(),
        };

        const resData = {
          _id: req.params._id,
          username: row.username,
          description: req.body.description,
          duration: Number(req.body.duration),
          date: req.body?.date ? new Date(req.body?.date).toDateString() : new Date().toDateString(),
        };

        const insert = 'INSERT INTO exercises (_id, username, description, duration, date) VALUES (?,?,?,?,?)';
        const params = [data._id, data.username, data.description, data.duration, data.date];

        db.run(insert, params, function (err, _) {
          if (err) {
            res.status(400);
            res.render('error', {
              title: JSON.stringify(err.message),
            });
            console.error(err.message);
            return next(err.message);
          }
          res.render('exercise', {
            title: 'Exercise tracker',
            id: resData._id,
            date: resData.date,
            username: resData.username,
            description: resData.description,
            duration: resData.duration,
          });
        });
      }
    });
  }
};

export default {
  addExerciseToUser,
};
