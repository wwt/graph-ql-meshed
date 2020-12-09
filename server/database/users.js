import { Chance } from 'chance';

const chance = new Chance();

export const createUserTable = (_) => {
  return `CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        email text UNIQUE, 
        CONSTRAINT email_unique UNIQUE (email)
        )`;
};

export const runUserInserts = (db) => {
    const insert = 'INSERT INTO user (name, email) VALUES ';
    const valuesBatched = Array.from({ length: 1000 }, (_, k) => {
      return `("${chance.name()}", "${k}${chance.email()}")`;
    }).join()
    db.run(insert.concat(valuesBatched));
}