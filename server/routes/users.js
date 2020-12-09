import express from 'express';
import db from '../database';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const sql = 'select * from user';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

export default router;
