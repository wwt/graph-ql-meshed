import sqliteLib from 'sqlite3';
import { createProjectTable, runProjectInserts } from './projects';
import { createTeamTable, runTeamInserts } from './teams';
import { createUserTable, runUserInserts } from './users';

const sqlite3 = sqliteLib.verbose();
const DBSOURCE = 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(createUserTable(), (err) => {
      if (!err) {
        runUserInserts(db);
      }
    });
    db.run(createTeamTable(), (err) => {
      if (!err) {
        runTeamInserts(db);
      }
    })
    db.run(createProjectTable(), (err) => {
      if (!err) {
        runProjectInserts(db);
      }
    })
  }
});

export default db;
