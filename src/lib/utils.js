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

module.exports = { getTime, baseJson, filtarPorId };
