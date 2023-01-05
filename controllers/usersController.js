import db from '../db/db.js';
import crypto from 'crypto';

// users controllers

const getUserById = (req, res, next) => {
  // named placeholders
  const select = 'SELECT * FROM users where _id = :_id';
  const params = [req.params._id];

  db.get(select, params, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(400);
      res.render('error', {
        title: JSON.stringify(err.message),
      });
      return next(err.message);
    } else if (!row) {
      console.error('No such user!');
      res.status(400);
      res.render('error', {
        title: 'No such user',
      });
      return next('No such user!');
    } else {
      res.render('user', {
        title: 'Exercise tracker',
        code: 'GET /api/user/:_id',
        username: row.username,
        id: row._id,
      });
    }
  });
};

const getUsers = (_, res, next) => {
  const select = 'SELECT * FROM users';
  let params = [];

  db.all(select, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400);
      res.render('error', {
        title: JSON.stringify(err.message),
      });
      return next(err.message);
    } else {
      res.render('users', {
        title: 'Exercise tracker',
        users: rows,
      });
    }
  });
};

const addUser = (req, res, next) => {
  const data = {
    _id: req.body?._id ?? crypto.randomBytes(20).toString('hex'),
    username: req.body.username,
  };

  const insert = 'INSERT INTO users (_id, username) VALUES (?,?)';
  const params = [data._id, data.username];

  if (data?.username) {
    db.run(insert, params, function (err, _) {
      if (err?.toString()?.includes('UNIQUE')) {
        console.error('Not unique username!');
        res.status(400);
        res.render('error', {
          title: 'Not unique username!',
        });
        return next('Not unique username!');
      } else if (err) {
        console.error(err.message);
        res.status(400);
        res.render('error', {
          title: JSON.stringify(err.message),
        });
        return next(err.message);
      }
      res.render('user', {
        title: 'Exercise tracker',
        code: 'POST /api/users',
        username: data.username,
        id: data._id,
      });
    });
  } else {
    console.error('No username!');
    res.status(400);
    res.render('error', {
      title: 'No username!',
    });
  }
};

export default {
  getUsers,
  getUserById,
  addUser,
};
