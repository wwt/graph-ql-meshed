import sqliteLib from 'sqlite3';
import { open } from 'sqlite';
import { createProjectTable, runProjectInserts } from './projects';
import { createTeamTable, runTeamInserts, selectTeamIds } from './teams';
import { createTeamMemberTable, runTeamMemberInserts } from "./teamMembers";
import { createUserTable, runUserInserts, selectUserIds } from './users';

const DBSOURCE = './db.sqlite';
const createDbConnection = async () => {
  return open({
    filename: DBSOURCE,
    driver: sqliteLib.Database
  })
}

(async () => {
  const dbLocal = await createDbConnection()
  console.log('Connected to database')
  await dbLocal.exec(createUserTable());
  await dbLocal.exec(createTeamTable());
  await dbLocal.exec(createTeamMemberTable());
  runUserInserts(dbLocal);
  runTeamInserts(dbLocal);
  const userIds = (await selectUserIds(dbLocal)).map(user => user.id);
  const teamIds = (await selectTeamIds(dbLocal)).map(team => team.id);
  runTeamMemberInserts(dbLocal, userIds, teamIds)
  await dbLocal.exec(createProjectTable());
  runProjectInserts(dbLocal, userIds);
  
  console.log('Init complete')
})();
