const log4js = require("log4js");

const getTime = () => {
  return {
    fyh: new Date().toLocaleString(),
    timestamp: Date.now(),
  };
};

const baseJson = (data) => {
  console.log(data);
  const allMensajes = data.map((chat) => {
    return chat;
  });

  return allMensajes;
};

const filtarPorId = (arrayBase,idToFilter) => {
  
  const indexProduct = arrayBase.findIndex((article) => article.id == idToFilter);
  console.log(indexProduct);
  if (indexProduct === -1) {
    return console.log(`producto no encontrado`);
  } else {
    const productFiltered = [];
    productFiltered.push(arrayBase[indexProduct]);
    console.log(productFiltered);
    return productFiltered;
  }
};

const logjsConfig = (entorno) => {
  const ent = entorno

  if (ent === "PROD") {
    log4js.configure({
      appenders: {
        miLoggerFile: { type: "file", filename: "debug.log" },
        miErrorFile: { type: "file", filename: "errores.log" },
        miWarnFile: { type: "file", filename: "warn.log" },
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
}

module.exports = { getTime, baseJson, filtarPorId, logjsConfig };
