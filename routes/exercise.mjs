import express from 'express';
import db from '../db/database.mjs';
import bodyParser from "body-parser";

// exercisesRoutes is an instance of the express router
const exercisesRoutes = express.Router();

exercisesRoutes.use(bodyParser.urlencoded({ extended: false }));
exercisesRoutes.use(bodyParser.json());

// insert exercise
exercisesRoutes.route("/api/users/:_id/exercises").post( (req, res) => {
  let errors=[];
  if (!req.params._id) {
    errors.push("No id specified!");
  }
  if (!req.body.description) {
    errors.push("No description specified!");
  }
  if (!req.body.duration) {
    errors.push("No duration specified!");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      console.error(err.message);
  }
  if(req.params._id){
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
        const data = {
          _id: req.params._id,
          username: row.username,
          description: req.body.description,
          duration: Number(req.body.duration),
          date: req.body?.date ? new Date(req.body?.date).toDateString() : new Date().toDateString(),
        }
      
        const insert = "INSERT INTO exercises (_id, username, description, duration, date) VALUES (?,?,?,?,?)";
        const params =[data._id, data.username, data.description, data.duration, data.date];
        db.run(insert, params, function (err, result) {
          if (err){
            res.status(400).json({"error": err.message});
            console.error(err.message);
          }
          res.json(data);
        });
      }
    });
  };
});

// get user logs by id
exercisesRoutes.route("/api/users/:_id/logs").get((req, res) => {
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

export default exercisesRoutes;