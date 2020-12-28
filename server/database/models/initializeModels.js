import Project from "../projects";
import TeamMember from "../teamMembers";
import Team from "../teams";
import User from "../users";

export default function initializeModels(sequelize) {
    console.log('initializing models');
    User.initWithConnection(sequelize);
    Team.initWithConnection(sequelize);
    TeamMember.initWithConnection(sequelize);
    Project.initWithConnection(sequelize);
}