import express from 'express';
import db from '../db/database.mjs';
import bodyParser from "body-parser";
import crypto from "crypto";

// usersRoutes is an instance of the express router
const usersRoutes = express.Router();

usersRoutes.use(bodyParser.urlencoded({ extended: false }));
usersRoutes.use(bodyParser.json());

// get all users
usersRoutes.route("/api/users").get((req, res) => {
  const select = "SELECT * FROM users";
  let params = [];
  db.all(select, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        console.error(err.message);
      }
      else if(!rows) {
        res.status(400).json({"error":"Something wrong with getting all users"});
        console.error("Something wrong with getting all users");
      }
      else {
        res.json(rows);
      }
    });
});

// insert user
usersRoutes.route("/api/users").post((req, res) => {
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
  
  db.run(insert, params, function (err, res) {
    if (err){
      res.status(400).json({"error": err.message});
      console.error(err.message);
    }
    res.json(data);
  });
});

export default usersRoutes;
