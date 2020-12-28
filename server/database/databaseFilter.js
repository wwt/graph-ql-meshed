import { Sequelize } from 'sequelize';
import initializeModels from './models/initializeModels';

export default async function DatabaseFilter(req, res, next) {
  if (['HEAD', 'OPTIONS'].includes(req.method)) return next();

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
  });

  initializeModels(sequelize);
  return next();
}
