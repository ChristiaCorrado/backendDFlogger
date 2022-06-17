//express import
const express = require("express");
const root = express.Router();
const {isAuthenticated} = require("../middleware/auth")

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

// const usuarios = [
//   { username: 'admin', password: '1234', admin : true },
//   { username: 'jose', password: '1234'  }
// ]


//<<<<<<<<<<<< MONGO >>>>>>>>>>>>
const connectMongo = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };


//<<<<<<<<<<< session >>>>>>>>>>>>>>>>
root.use(cookieParser())

root.use(
  session({
    store: connectMongo.create({
      mongoUrl:
        "mongodb+srv://admin:1234@cluster0.d5rwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
        await users.saveNewUser(req.body)
        
        done(null, { username: username })
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {
   
    const existe = await users.findUser(username, password)
    

    if (!existe) {
      return done(null, false)
    } else {
      
      
      return done(null, {username: username})
    }
    
  })
)

passport.serializeUser((usuario, done) => {
  
  console.log(usuario.username + 'serializado')
  done(null, usuario.username)
})

passport.deserializeUser(async (usuario, done) => {
  
  const usuarioDzFinded = await users.findOne(usuario)

  

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
