const express = require('express');

const router = express.Router();

const {pool} = require("../configuration/databasecon");

const jwt = require('jsonwebtoken');

const bcrypt= require('bcryptjs');

const secretKey = process.env.SECRET_KEY;

router.post('/', async (req, res)=> {
    const { username, password } = req.body;
  
    pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, users) =>{
      if (err) return res.status(500).send('Error on the server.');
      if (users.length === 0) return res.status(404).send('No user found.');
  
      const user = users[0];
  
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 }); // 24 hours
  
       // Store username and token in the session
       req.session.username = user.username;
       req.session.token = token;
      res.redirect('/');
    });
  });
  module.exports = router;