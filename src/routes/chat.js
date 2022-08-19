//express import
const express = require("express");
const routerChat = express.Router();
const app = express();

//container import
const userDao = require("../DAOs/users/usersDao")
const chatUser = new userDao
const {  userAuth } = require("../middleware/auth");


const { Server: IOServer, Socket } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const chatSocket = require("../Container/chat")
const chat = new chatSocket

httpServer.listen(3000)


routerChat.get('/:email', userAuth, (req, res) => {
    const dataM = []

    const messages = chat.readMessages()
    .then(data => {
        
        dataM.push(...data)
        
    });


    io.on("connection", (socket) => {
        console.log("SE CONECTO UN USUARIO");
        console.log(dataM);
        socket.emit("messages", dataM);

        socket.on("mensaje", (data) => {
        mensajes.push(data);
        console.log(mensajes);
        io.sockets.emit(mensajes);
        });

        socket.on("new-message", (data) => {
        console.log(data);
        chat.saveMessages(data)
        io.sockets.emit("messages", messages);
    });


    });


    res.render('supportChannel')

})


module.exports = routerChat