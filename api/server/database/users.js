import { Chance } from 'chance';
import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
const chance = new Chance();

export const createUserTable = (_) => {
  return `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        email text UNIQUE, 
        CONSTRAINT email_unique UNIQUE (email)
        )`;
};

export const runUserInserts = (db, callback) => {
    const insert = 'INSERT INTO user (name, email) VALUES ';
    const valuesBatched = Array.from({ length: 1000 }, (_, k) => {
      return `("${chance.name()}", "${k}${chance.email()}")`;
    }).join()
    db.run(insert.concat(valuesBatched), callback);
}

export const selectUserIds = (db) => {
  const select = 'SELECT id FROM user'
  return db.all(select);
}

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}
export default class User extends Model {
  static initWithConnection(connection) {
    super.init(modelAttributes, {
      sequelize: connection,
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    });
  }
}