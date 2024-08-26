const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    const username = req.session.username;
    res.render('index', { username });
  });
  module.exports = router;