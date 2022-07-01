//express import
const express = require("express");
const root = express.Router();



const {isAuthenticated , userAuth} = require("../middleware/auth")
const dotenv = require('dotenv')

//web tokens
const PRIVATE_KEY = 'miClavePrivada'

//cookie + session + passport
const cookieParser = require("cookie-parser");

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const userDao = require("../DAOs/users/usersDao");
const users = new userDao;

dotenv.config()

//<<<<<<<<<<< session >>>>>>>>>>>>>>>>
root.use(cookieParser())

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
    
      
      return done(null, existe)
    }
    
  })
)

passport.serializeUser((user, done) => {
  
  console.log(user.id + ' serializado')

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
  const user = req.user
  
  res.render("root",{user});
});

root.post('/login', passport.authenticate('login', {
  
  successRedirect: '/api/admin',
  failureRedirect: '/login-error',
  
}))

root.get('/login-error', (req, res) => {
  res.render("login-error")

})

//ADMIN

root.get("/api/admin", isAuthenticated, (req, res) => {
  

  res.render("admin")
  
})

//PROFILE

root.get(`/api/profile/:user`,userAuth, async (req, res)=>{

  
  const user = [await users.findOne(req.params.user)]
  
  res.cookie('_id', `${req.params.user}`)
  
  req.app.locals.user = req.params.user

  res.render("profile", {user})
  
}) 

//LOGOUT

root.get(`/logout`, (req, res) => {
  console.log(req.session);
  res.clearCookie(req.session)
  req.session.destroy()
  res.redirect(`/`)
})

module.exports = root;
