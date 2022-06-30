const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const queryString = `SELECT * FROM genres ORDER BY id ASC`;
  pool.query(queryString).then(results => {
    res.send(results.rows);
  }).catch(err => {
    console.log(err);
  res.sendStatus(500)
  })
});

module.exports = router;