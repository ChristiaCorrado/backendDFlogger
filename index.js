
//const nodemailer = require('./src/lib/nodemailer')

const cluster = require('cluster')
const os = require('os')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const MODO = process.argv[2] || 'FORK'

dotenv.config()

if (MODO === 'CLUSTER' && cluster.isMaster) {

  const numCPUs = os.cpus().length

  console.log(`procesadores disponibles  ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for(let i = 0; i < numCPUs; i++) {
    cluster.fork()

  }

  cluster.on('exit',(worker) =>{
    console.log(
      'Worker ',
      worker.process.pid,
      'died ',
      new Date().toLocaleString()
    );
  })
}else{

  const express = require("express");
  const { urlencoded } = require("express")
  const router = require("./src/routes/routesIndex")
  const rootSession = require("./src/routes/root")
  const randomNumero = require("./src/routes/calculo")
  const graphql = require("./src/routes/graphi")

  const session = require('express-session');
  const connectMongo = require("connect-mongo");
  const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  const app = express();
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
        maxAge: 24 * 60 * 60 * 1000, 
      },
    })
  ); 
  
  app.use((req,res,next) => {
    app.locals.user = req.session.passport || null;
    next()
  })
  app.use(`/api`, router);
  app.use('/', rootSession)
  app.use('/', graphql)

  
  app.set("view engine", "ejs");
  
  


  app.use(express.static("./public"));

  app.listen(app.get('port'), () => {
    console.info(`'listening on port' ${app.get('port')},  'PID' ${process.pid}`)
  })


}






