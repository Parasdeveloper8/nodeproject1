const express = require("express");
const app = express();
const port = process.env.PORT || 20101; // Fix: Use process.env.PORT for environment-specific port
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
// Set up database connection


const { createPool } = require("mysql2");
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "8890Aaaa@",
    database: "jwt_auth_db",
    connectionLimit: 30
});

// Set up templating engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(__dirname + '/public')); 
app.use(express.urlencoded({ extended: false }));


const secretKey = 'parasdeveloper8';
// Routes
app.get('/', (req, res) => {
    res.render("index");
});
app.post('/register',(req,res)=>{
    const {username , password} = req.body;
    bcrypt.hash(password,10,(err,hashedPassword)=>{
        if(err){
            return res.status(500).json({message:'Error hashing password'});
        }
        const sql = 'insert into jwt_auth_db.users(username,password) values(?,?)';
        pool.query(sql , [username,hashedPassword],(err,result)=>{
            if(err){
                return res.status(500).json({message:'database error' , error:err});
            }
            res.status(201).json({message:'user registered successfully'});
        });
    });
});
app.post('/login', async (req, res)=> {
    const { username, password } = req.body;
  
    pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, users) =>{
      if (err) return res.status(500).send('Error on the server.');
      if (users.length === 0) return res.status(404).send('No user found.');
  
      const user = users[0];
  
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 }); // 24 hours
  
      res.status(200).send({ auth: true, token: token });
    });
  });
  
  // Middleware to verify the token
  function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  
      req.userId = decoded.id;
      next();
    });
  }
  
  // Protected route example
  app.get('/protected', verifyToken, function (req, res) {
    res.status(200).send('Access granted to protected route!');
  });
  app.get('/profile',(req,res)=>{
    res.render("user");
  });
  app.get("/registerpage",(req,res)=>{
    res.render("register");
  });
  app.get("/loginpage",(req,res)=>{
    res.render("login");
  });


























app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
