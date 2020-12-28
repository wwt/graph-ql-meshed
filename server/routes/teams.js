import express from 'express';
import Team from '../database/teams';

const router = express.Router();
router.get('/', async (req, res, next) => {
  const data = await Team.findAll();
  if (!data) {
    return response.status(404).send();
  }
  res.json({
    message: 'success',
    data,
  });
});

export default router;
