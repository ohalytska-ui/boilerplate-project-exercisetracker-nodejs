import db from '../db/database.js';
import crypto from "crypto";

// users controllers

const getUsers = (req, res, next) => {
  const select = "SELECT * FROM users";
  let params = [];

  db.all(select, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      console.error(err.message);
      return next(err);
    }

    else if(!rows) {
      res.status(400).json({"error":"Something wrong with getting all users"});
      console.error("Something wrong with getting all users");
    }

    else {
      res.json(rows);
    }
  });
};

const addUser = (req, res, next) => {
  let errors=[];
  if (!req.body.username) {
    errors.push("No username specified!");
  }

  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    console.error(errors);
  }

  const data = {
    _id: crypto.randomBytes(20).toString('hex'),
    username: req.body.username,
  }

  const insert = "INSERT INTO users (_id, username) VALUES (?,?)";
  const params =[data._id, data.username];

  db.run(insert, params, function (err, response) {
    if (err){
      res.status(400).json({"error": err.message});
      console.error(err.message);
      return next(err);
    }
    res.json(data);
  });
};

export default {
  getUsers,
  addUser
}
