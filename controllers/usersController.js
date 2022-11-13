import db from '../db/database.js';
import crypto from 'crypto';

// users controllers

const getUserById = (req, res, next) => {
  // named placeholders
  const select = 'SELECT * FROM users where _id = :_id';
  const params = [req.params._id];

  db.get(select, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err });
      console.error(err);
      next(err);
    } else if (!row) {
      res.status(400).json({ error: 'No such user!' });
      console.error('No such user!');
    } else {
      res.json(row);
    }
  });
};

const getUsers = (req, res, next) => {
  const select = 'SELECT * FROM users';
  let params = [];

  db.all(select, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      console.error(err.message);
      return next(err);
    } else {
      res.json(rows);
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

  db.run(insert, params, function (err, response) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.error(err.message);
      return next(err);
    }
    res.json(data);
  });
};

export default {
  getUsers,
  getUserById,
  addUser,
};
