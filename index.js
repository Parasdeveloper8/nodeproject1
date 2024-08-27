const express = require("express");

const app = express();

const session = require('express-session');

const path = require('path');

const port = process.env.PORT || 4100; 

const dotenv = require('dotenv').config();

const home = require("./Routes/home");

const mypostpage = require('./Routes/mypostpage');

const blog = require('./Routes/blog');

const register = require('./Routes/register');

const login = require('./Routes/login');

const logout = require('./Routes/logout');

const profile = require("./Routes/profile");

const registerpage = require("./Routes/registerpage");

const loginpage = require("./Routes/loginpage");

const blogpostpage = require("./Routes/blogpostpage");

const protected = require("./Routes/protected");

const getBlogs = require("./Routes/getblogsapi");

const getmyblogs = require("./Routes/getyourblogsapi");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const secretKey = process.env.SECRET_KEY;
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/',home);

app.use("/postyourblogs",blog);

app.use('/register',register);
                
app.use('/login',login);

app.use('/logout',logout);
  
app.use('/profile',profile);

app.use('/registerpage',registerpage);

app.use("/loginpage",loginpage);

app.use("/blogpostpage",blogpostpage);

app.use("/protected",protected);

app.use("/getblogs",getBlogs);

app.use("/mypost",mypostpage);

app.use("/getyourBlogs",getmyblogs);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
