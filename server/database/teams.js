import { Chance } from 'chance';
import pkg from 'sequelize';
const { DataTypes, Model } = pkg;

export const chance = new Chance();

export const createTeamTable = (_) => {
  return `CREATE TABLE IF NOT EXISTS team (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text
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

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}
export default class Team extends Model {
  static initWithConnection(connection) {
    super.init(modelAttributes, {
      sequelize: connection,
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    });
  }
}