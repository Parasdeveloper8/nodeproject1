const express = require('express');
const router = express.Router();
const {verifyToken} = require("../middlewares/verifyToken");

router.get("/",verifyToken,(req,res)=>{
   res.send("access granted").status(200);
});

module.exports = router;