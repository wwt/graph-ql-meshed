import flatten from 'lodash/flatten';
import { chance } from './teams';
import pkg from 'sequelize';
const { DataTypes, Model } = pkg;

export const createTeamMemberTable = (_) => {
  return `CREATE TABLE IF NOT EXISTS teammember (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          member_id INTEGER,
          team_id INTEGER,
          FOREIGN KEY (member_id) REFERENCES user (id),
          FOREIGN KEY (team_id) REFERENCES team (id)
          )`;
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

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
}
export default class TeamMember extends Model {
  static initWithConnection(connection) {
    super.init(modelAttributes, {
      sequelize: connection,
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    });
  }
}