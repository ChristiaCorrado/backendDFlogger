const fs = require("fs");


class ChatSocket {
    constructor(){ }

    async readMessages() {
      try {
  
        const mensajes = JSON.parse( await fs.promises.readFile("./dataBase/chat.txt", "utf8"))
        
  
        return mensajes;
      } catch (err) {
        console.log(err.message);
      }
    }
  
    async saveMessages(mensaje) {
      try {
        const chat = await this.readMessages();
        const newChat = [...chat, mensaje];
        console.log(newChat);
        await fs.promises.writeFile('./dataBase/chat.txt',JSON.stringify(newChat ,null,2))
      } catch (err) {
        console.log(err.message);
      }
    }

    baseJson = (data) => {
      console.log(data);
      const allMensajes = data.map((chat) => {
        return allMensajes;
      })}

    
}

module.exports = ChatSocket