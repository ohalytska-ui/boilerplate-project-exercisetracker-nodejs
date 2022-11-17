import sqlite3 from 'sqlite3';

// db folder
const DB_PATH = 'db/db.sqlite';

// create db
let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    // cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// create users table
db.run('CREATE TABLE IF NOT EXISTS users (_id TEXT PRIMARY KEY, username TEXT UNIQUE)', (err) => {
  if (err) {
    // cannot open table
    console.error(err);
    throw err;
  }
});

// create exercises table
db.run(
  'CREATE TABLE IF NOT EXISTS exercises (_id TEXT, username TEXT, description TEXT, duration INTEGER, date Date)',
  (err) => {
    if (err) {
      // cannot open table
      console.error(err);
      throw err;
    }
  },
);

export default db;
