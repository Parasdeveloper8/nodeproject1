const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const {pool} = require('../configuration/databasecon');
router.post('/',(req,res)=>{
    const {username , password} = req.body;
    bcrypt.hash(password,10,(err,hashedPassword)=>{
        if(err){
            return res.status(500).send('Error hashing password');
        }
        const sql = 'insert into jwt_auth_db.users(username,password) values(?,?)';
        pool.query(sql , [username,hashedPassword],(err,result)=>{
            if(err){
                return res.status(500).send(`database error${err}`);
            }
            res.status(201).render("onsuccessregistration");
        });
    });
});
module.exports = router;