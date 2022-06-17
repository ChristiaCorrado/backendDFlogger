//express import`
const express = require("express");
const calculo = express.Router();
const log4js = require("log4js");

const ENT = "PROD";

if (ENT === "PROD") {
  log4js.configure({
    appenders: {
      miLoggerFile: { type: "file", filename: "debug.log" },
      miErrorFile: { type: "file", filename: "errores.log" },
    },
    categories: {
      default: { appenders: ["miLoggerFile"], level: "all" },
      logwn: { appenders: ["miErrorFile"], level: "warn" },
      logInfo: { appenders: ["miLoggerFile"], level: "info" },
    },
  });
} else {
  log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console" },
    },
    categories: {
      default: { appenders: ["miLoggerConsole"], level: "all" },
      logwn: { appenders: ["miLoggerConsole"], level: "warn" },
      logInfo: { appenders: ["miLoggerConsole"], level: "info" },
    },
  });
}

const logWarning = log4js.getLogger("logwn");
const logInfo = log4js.getLogger("logInfo");

//os
const os = require("os");
const numCPUs = os.cpus().length;

//fork
//const { fork } = require("child_process");

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

//const randomNumbersFork = fork("./src/randomNumber/randomN.js");

calculo.get("/randoms", (req, res) => {
  const cantidad = 5000;

  randomNumbersFork.send(cantidad);

  randomNumbersFork.on("message", (resultado) => {
    res.json({ resultado });
  });
});

module.exports = calculo;
