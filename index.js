

const cluster = require('cluster')
const os = require('os')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const MODO = process.argv[2] || 'FORK'
const path = require('path')


dotenv.config()

if (MODO === 'CLUSTER' && cluster.isMaster) {

  const numCPUs = os.cpus().length


  for(let i = 0; i < numCPUs; i++) {
    cluster.fork()

  }

  cluster.on('exit',(worker) =>{
    
  })
}else{

  const express = require("express");
  const app = express();
  const { urlencoded } = require("express")
  const router = require("./src/routes/routesIndex")
  const rootSession = require("./src/routes/root")
  
  const graphql = require("./src/routes/graphi")
  const flash = require('connect-flash')
  const session = require('express-session');
  const connectMongo = require("connect-mongo");
  const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  const { Server: HttpServer } = require('http')
  const { Server: IOServer } = require('socket.io')
  
  const httpServer = new HttpServer(app)

  const io = new IOServer(httpServer)
  

  
  app.use(express.json());
  app.use(urlencoded({ extended: true }));




  app.set('port', process.env.PORT || 8080)

  app.use(
    session({
      store: connectMongo.create({
        mongoUrl: process.env.URL_MONGO,
        mongoOptions: advancedOptions, 
      }),
      secret: 'SECRETO',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60  * 1000, 
      },
    })
  ); 
  
  app.use(flash());
  
  app.use((req,res,next) => {
    app.locals.user = req.session.passport || null;
    next()
  })

  app.use(`/api`, router);
  app.use('/', rootSession)
  app.use('/', graphql)
  

  app.set("view engine", "ejs");
  
  app.use(express.static(path.join(__dirname,'public')));

  httpServer.listen(app.get('port'), () => {
    console.info(`'listening on port' ${app.get('port')},  'PID' ${process.pid}`)
  })


  const chatSocket = require("./src/Container/chat")
  const chat = new chatSocket

  const dataM = []

    const messages = chat.readMessages()
    .then(data => {
        
        dataM.push(...data)
        
    });

  io.on("connection", (socket) => {
    
     
     socket.emit("messages", dataM);

     socket.on("mensaje", (data) => {
     mensajes.push(data);
    
     io.sockets.emit(mensajes);
     });

     socket.on("new-message", (data) => {
     
     chat.saveMessages(data)
     io.sockets.emit("messages", messages);
    });


});

}







