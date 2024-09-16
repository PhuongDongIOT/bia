const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./gme.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        core TEXT,
        password TEXT,
        created_date DATE,
        updated_date DATE,
        deleted_date DATE,
        UNIQUE (user_id)
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  );

  db.run(`ALTER TABLE users ADD COLUMN is_deleted INTEGER default 0`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        country TEXT,
        postcode TEXT,
        name TEXT,
        address TEXT,
        lat DECIMAL,
        lng DECIMAL,
        start_date DATE,
        end_date DATE
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  );

  db.run(`ALTER TABLE events ADD COLUMN created_date DATE`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  )


  db.run(`ALTER TABLE events ADD COLUMN is_deleted INTEGER default 0`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  )

  db.run(`ALTER TABLE events ADD COLUMN user_created TEXT default null`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  )

  db.run(`ALTER TABLE events ADD COLUMN user_deleted TEXT default null`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  )

  db.run(`ALTER TABLE events ADD COLUMN reason TEXT default null`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    },
  )
});
