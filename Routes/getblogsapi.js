const express = require('express');
const router = express.Router();
const {pool} = require("../configuration/databasecon");

router.get("/",(req,res)=>{
   pool.query("select * from jwt_auth_db.posts",(err,result)=>{
    if(err){
        console.log(err);
        res.send(err);
    }
    else if(result==0){
        console.log("nothing found");
    }
    else{
        res.json(result);
        console.log("db query successful",result);
    }
   });
});
module.exports = router;