import { Chance } from 'chance';

const chance = new Chance();

export const createTeamTable = (_) => {
  return `CREATE TABLE team (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text
        )`;
};

export const runTeamInserts = (db) => {
  const insert = 'INSERT INTO team (name) VALUES ';
  const valuesBatched = Array.from({ length: 100 }, (_) => {
    return `("${chance.color({ format: 'name' })}")`;
  });
  db.run(insert.concat(valuesBatched));
};
