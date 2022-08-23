//express import
const express = require("express");
const routerChat = express.Router();
const app = express();

//container import
const userDao = require("../DAOs/users/usersDao")
const chatUser = new userDao
const {  userAuth } = require("../middleware/auth");











routerChat.get('/:email', userAuth, (req, res) => {
    


    // io.on("connection", (socket) => {
    //     console.log("SE CONECTO UN USUARIO");
    //     console.log(dataM);
    //     socket.emit("messages", dataM);

    //     socket.on("mensaje", (data) => {
    //     mensajes.push(data);
    //     console.log(mensajes);
    //     io.sockets.emit(mensajes);
    //     });

    //     socket.on("new-message", (data) => {
    //     console.log(data);
    //     chat.saveMessages(data)
    //     io.sockets.emit("messages", messages);
    //     });


    // });


    res.render('supportChannel')

})


module.exports = routerChat