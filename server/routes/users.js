import express from 'express';
import {createDbConnection} from '../database/database';

const router = express.Router();
const db = (async () => {await createDbConnection()})();
/* GET users listing. */
router.get('/', function (req, res, next) {
  const sql = 'select * from user';
  console.log(db)
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
