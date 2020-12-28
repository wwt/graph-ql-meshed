import express from 'express';
import User from '../database/users';

const router = express.Router();
router.get('/', async (req, res, next) => {
  const data = await User.findAll();
  if (!data) {
    return response.status(404).send();
  }
  res.json({
    message: 'success',
    data,
  });
});

export default router;
