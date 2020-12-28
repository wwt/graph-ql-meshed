import express from 'express';
import Project from '../database/projects';

const router = express.Router();
router.get('/', async (req, res, next) => {
  const data = await Project.findAll();
  if (!data) {
    return response.status(404).send();
  }
  res.json({
    message: 'success',
    data,
  });
});

export default router;
