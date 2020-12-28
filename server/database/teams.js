import { Chance } from 'chance';
import flatten from 'lodash/flatten';

const chance = new Chance();

export const createTeamTable = (_) => {
  return `CREATE TABLE IF NOT EXISTS team (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text
        )`;
};

export const createTeamMemberTable = (_) => {
  return `CREATE TABLE IF NOT EXISTS teammember (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        member_id INTEGER,
        team_id INTEGER,
        FOREIGN KEY (member_id) REFERENCES user (id),
        FOREIGN KEY (team_id) REFERENCES team (id)
        )`;
};

export const selectTeamIds = (db) => {
  const select = 'SELECT id FROM team';
  return db.all(select);
};
export const runTeamInserts = (db) => {
  const insert = 'INSERT INTO team (name) VALUES ';
  const valuesBatched = Array.from({ length: 100 }, (_) => {
    return `("${chance.color({ format: 'name' })}")`;
  });
  db.run(insert.concat(valuesBatched));
};

export const runTeamMemberInserts = (db, userIds, teamIds) => {
  const insert = 'INSERT INTO teammember (member_id, team_id) VALUES ';
  const valuesBatched = teamIds.map((teamId) => {
    const teams = randomizedTeam(userIds).map(
      (memberId) => `(${memberId}, ${teamId})`
    );
    return flatten(teams);
  });
  db.run(insert.concat(valuesBatched));
};

const randomizedTeam = (userIds) => {
  const teamSize = chance.natural({ min: 1, max: 5 });
  return chance.pickset(userIds, teamSize);
};
