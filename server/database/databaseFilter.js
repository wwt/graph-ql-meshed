import pkg from 'sequelize';
const { Sequelize, QueryTypes } = pkg;
import initializeTables from './database';
import initializeModels from './models/initializeModels';

export default async function DatabaseFilter(req, res, next) {
  if (['HEAD', 'OPTIONS'].includes(req.method)) return next();

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
  });
  await initializeTables();
  initializeModels(sequelize);
  return next();
}
