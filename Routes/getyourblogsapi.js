const express = require("express");
const {pool} = require("../configuration/databasecon");
const router = express.Router();

router.get("/",(req,res)=>{
    const username = req.session.username;
    pool.query("select * from jwt_auth_db.posts where user = ?",[username],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else if(result==0){
            console.log("you haven't posted yet");
        }
        else{
            res.json(result);
        }
    });
});
module.exports = router;