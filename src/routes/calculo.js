//express import`
const express = require("express");
const calculo = express.Router();
const log4js = require("log4js");
const logger = require("../lib/utils")




//os
const os = require("os");
const numCPUs = os.cpus().length;


//const compression = require('compression')

calculo.get("/info", (_req, res) => {

  logInfo.info( {message:`'Ruta' ${_req.url}`})

  const processInfo = {
    platform: process.platform,
    version: process.version,
    title: process.title,
    execPath: process.execPath,
    processId: process.pid,
    rss: process.memoryUsage().rss,
    fyh: new Date().toLocaleString,
    numeroDeNucleos: numCPUs,
  };

  res.send(`<h1>${JSON.stringify(processInfo, null, 2)}</h1>`);
});

calculo.get("/infoCompress", (_req, res) => {
  const processInfo = {
    platform: process.platform,
    version: process.version,
    title: process.title,
    execPath: process.execPath,
    processId: process.pid,
    rss: process.memoryUsage().rss,
    fyh: new Date().toLocaleString,
    numeroDeNucleos: numCPUs,
  };

  res.send(`<h1>${JSON.stringify(processInfo, null, 2)}</h1>`);
});



calculo.get("/randoms", (req, res) => {
  const cantidad = 4000;

  randomNumbersFork.send(cantidad);

  randomNumbersFork.on("message", (resultado) => {
    res.json({ resultado });
  });
});

module.exports = calculo;
