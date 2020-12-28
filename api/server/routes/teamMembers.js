import express from 'express';
import TeamMember from '../database/teamMembers';

const router = express.Router();
router.get('/', async (req, res, next) => {
  const data = await TeamMember.findAll();
  if (!data) {
    return response.status(404).send();
  }
  res.json({
    message: 'success',
    data,
  });
});

export default router;
