//express import
const express = require("express");
const routerChat = express.Router();
const app = express();

//container import
const userDao = require("../DAOs/users/usersDao")
const chatUser = new userDao
const {  userAuth } = require("../middleware/auth");











routerChat.get('/:email', userAuth, (req, res) => {
    


    res.render('supportChannel')

})


module.exports = routerChat