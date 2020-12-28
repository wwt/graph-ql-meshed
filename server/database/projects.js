import { Chance } from 'chance';
import pkg from 'sequelize';
const { DataTypes, Model } = pkg;

const chance = new Chance();

export const createProjectTable = (_) => {
  return `CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        team_id INTEGER,
        lead_id INTEGER,
        FOREIGN KEY (team_id) REFERENCES team (id), 
        FOREIGN KEY (lead_id) REFERENCES user (id)
        )`;
};

export const runProjectInserts = (db, userIds) => {
    const insert = 'INSERT INTO project (name, team_id, lead_id) VALUES ';
    const valuesBatched = Array.from({ length: 100 }, (_, k) => {
      return `("${chance.animal()}", ${k + 1}, ${userIds[k]})`;
    })
    db.run(insert.concat(valuesBatched));
}

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
}
export default class Project extends Model {
  static initWithConnection(connection) {
    super.init(modelAttributes, {
      sequelize: connection,
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    });
  }
}