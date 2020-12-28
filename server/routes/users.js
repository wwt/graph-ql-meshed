import express from 'express';
import {createDbConnection} from '../database/database';
import User from '../database/users';

const router = express.Router();
const db = (async () => {await createDbConnection()})();
/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  if (!users) {
    return response.status(404).send();
  }
  res.json({
    message: 'success',
    data: users,
  });
});

export default router;
