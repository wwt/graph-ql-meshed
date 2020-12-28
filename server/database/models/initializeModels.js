import User from "../users";

export default function initializeModels(sequelize) {
    console.log('initializing models');
    User.initWithConnection(sequelize);
}