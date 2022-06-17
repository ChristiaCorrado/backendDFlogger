

const cluster = require('cluster')
const os = require('os')

const MODO = process.argv[2] || 'FORK'


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

  const app = express();
  app.use(express.json());
  app.use(urlencoded({ extended: true }));

  app.set('port', process.env.PORT || 8080)

  app.use(`/api`, router);
  app.use('/', rootSession)
  app.use('/', randomNumero)

  app.listen(app.get('port'), () => {
    console.info(`'listening on port' ${app.get('port')},  'PID' ${process.pid}`)
  })

  app.set("view engine", "ejs");


  app.use(express.static("./public"));

}






