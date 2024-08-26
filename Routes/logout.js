const express = require('express');

const router = express.Router();

const session = require('express-session');

router.post('/', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Error logging out.');
        res.redirect('/');
    });
});

module.exports = router;