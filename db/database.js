import sqlite3 from 'sqlite3';

// db folder
const DBSOURCE = 'db/userDb.sqlite';

// create db
let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// create users table
db.run('CREATE TABLE IF NOT EXISTS users (_id TEXT PRIMARY KEY, username text, UNIQUE(username))', (err) => {
  if (err) {
    // cannot open table
    console.error(err);
    throw err;
  }
});

// create exercises table
db.run(
  'CREATE TABLE IF NOT EXISTS exercises (_id TEXT, username text, description text, duration INTEGER, date Date)',
  (err) => {
    if (err) {
      // cannot open table
      console.error(err);
      throw err;
    }
  },
);

export default db;
