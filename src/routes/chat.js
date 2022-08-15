//container import
const userDao = require("../DAOs/users/usersDao")
const chatUser = new userDao
const {  userAuth } = require("../middleware/auth");

//express import
const express = require("express");
const routerChat = express.Router();


routerChat.get('/:email', userAuth, (req, res) => {


    res.render('supportChannel')

})


module.exports = routerChat