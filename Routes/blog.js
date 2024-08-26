const express = require('express');

const router = express.Router();

const {storage} = require("../configuration/multercon");

const multer = require("multer");

const upload = multer({ storage: storage });

const {pool} = require("../configuration/databasecon");

router.post("/",upload.single('photo'),(req,res)=>{
  const title = req.body.text;
  const user = req.session.username;
  const photo_url = req.file ? `${process.env.UPLOAD_FOLDER}/${req.file.filename}` : null;
  pool.query("insert into jwt_auth_db.posts(user,posturl,title) values(?,?,?)",[user,photo_url,title],(err,result)=>{
    if(err){
    console.log(err);
    res.send("failed to post",err);
  }
  else{
    res.send("successfully posted");
    }
  })
 });
 module.exports = router;