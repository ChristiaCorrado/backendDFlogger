//express import
const express = require("express");
const root = express.Router();

//EMAILSENDER
const htmlTemplate = require("../Notificacion/gmail/email");

const { isAuthenticated, userAuth } = require("../middleware/auth");
const dotenv = require("dotenv");

//web tokens
const PRIVATE_KEY = "miClavePrivada";

//cookie + session + passport
const cookieParser = require("cookie-parser");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userDao = require("../DAOs/users/usersDao");
const users = new userDao();

dotenv.config();

//<<<<<<<<<<< session >>>>>>>>>>>>>>>>
root.use(cookieParser());

root.use(passport.initialize());
root.use(passport.session());

//passport

passport.use(
  "register",

  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, email, done) => {
      const existe = await users.findUser(username, email);


      if (existe) {
        return done(null, false);
      } else {
        const userOk = await users.saveNewUser(req.body);

        const email = req.body.email;
        const mensaje = htmlTemplate.emailToNewUser(
          req.body.username,
          req.body.password
        );
        htmlTemplate.sendGmail(email, mensaje);

        done(null, userOk);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {

    const existe = await users.findUser(username, password);

    if (!existe) {
      return done(null, false);
    } else {
      return done(null, existe);
    }
  })
);

passport.serializeUser((user, done) => {


  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const usuarioDzFinded = await users.findOne(id);


  done(null, usuarioDzFinded);
});

//REGISTRAR

root.get("/register", (req, res) => {
  // AQUI ENVIAR EL EMAIL
  res.render("register");
});

root.get("/register-success", (req, res) => {
  res.render("register-success");
});

root.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/register-success",
    failureRedirect: "/login-error",
  })
);

//login
root.get("/login", (req, res) => {
  req.session.destroy();
  const user = req.user;

  res.render("root", { user });
});

root.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/api/admin",
    failureRedirect: "/login-error",
  })
);

root.get("/login-error", (req, res) => {
  res.render("login-error");
});

//ADMIN

root.get("/api/admin", isAuthenticated, (req, res) => {
  req.app.locals.admin = `true`
  res.render("admin");

});

//PROFILE

root.get(`/api/profile/:user`, userAuth, async (req, res) => {
  req.app.locals.admin = `false`
  const user = [await users.findOne(req.params.user)];


  res.cookie("_id", `${req.params.user}`);


  req.app.locals.user = req.params.user;
  

  res.render("profile", { user });
});

//LOGOUT

root.get(`/logout`, (req, res) => {

  res.clearCookie(req.session);
  req.session.destroy();
  res.redirect(`/`);
});

module.exports = root;
