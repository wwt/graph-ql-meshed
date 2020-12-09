import sqliteLib from 'sqlite3'
import md5 from 'md5'

const sqlite3 = sqliteLib.verbose()
const DBSOURCE = "db.sqlite"

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email) VALUES (?,?)'
                db.run(insert, ["admin","admin@example.com"])
                db.run(insert, ["user","user@example.com"])
            }
        });
    }
});


export default db;