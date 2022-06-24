//express import
const express = require("express");
const root = express.Router();
const {isAuthenticated} = require("../middleware/auth")
const dotenv = require('dotenv')

//web tokens
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = 'miClavePrivada'

//cookie + session + passport
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//persistencia

const userDao = require("../DAOs/users/usersDao");
const users = new userDao;

dotenv.config()

//<<<<<<<<<<<< MONGO >>>>>>>>>>>>
const connectMongo = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };


//<<<<<<<<<<< session >>>>>>>>>>>>>>>>
root.use(cookieParser())

root.use(
  session({
    store: connectMongo.create({
      mongoUrl: process.env.URL_MONGO,
      mongoOptions: advancedOptions,
    }),
    secret: 'SECRETO',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2000, //20 seg
    },
  })
);  

root.use(passport.initialize())
root.use(passport.session())



//passport

passport.use(
  'register',

  new LocalStrategy(
    { passReqToCallback: true },
     async (req, username, email, done) => {
      
      const existe = await users.findUser(username, email)
      
      console.log(existe);
      if (existe) {
        return done(null, false)
      } else {
        const userOk = await users.saveNewUser(req.body)
        
        done(null, userOk )
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {
    console.log(username);
    const existe = await users.findUser(username, password)
    

    if (!existe) {
      return done(null, false)
    } else {
    
      
      return done(null, {username: username})
    }
    
  })
)

passport.serializeUser((user, done) => {
  
  console.log(user.id + 'serializado')

  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  
  const usuarioDzFinded = await users.findOne(id)


  console.log(JSON.stringify(usuarioDzFinded) + ' desserializado')
  done(null, usuarioDzFinded)
})

//registrar

root.get("/register",  (req, res)=>{
  res.render("register")
})

root.post("/register",passport.authenticate('register', {
  successRedirect: '/login',
  failureRedirect: '/login-error',
}))


//login
root.get("/login", (req, res) => {
  req.session.destroy()
  console.log(req.session);
  res.render("root");
});

root.post('/login', passport.authenticate('login', {
  successRedirect: '/api/admin',
  failureRedirect: '/login-error',
}))


root.get("/api/admin", isAuthenticated, (req, res) => {
  res.render("admin")
  
})

module.exports = root;
