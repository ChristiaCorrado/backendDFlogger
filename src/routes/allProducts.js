//container import
const productoDao = require("../DAOs/products/prductsDaoMongoDb");
const product = new productoDao

//express import
const express = require("express");
const routerProductos = express.Router();





routerProductos.get("/", async (req, res) => {
  
  allArticles = await product.getAll()
  console.log('renderizar prodictos');
  res.render('allProducts', allArticles)
});

routerProductos.post("/", async (req, res) => {
  console.log(`entro en enviarproducto a la bass`);
  const newArticle = req.body
  console.log(req.body);
  await product.saveNewProduct(req.body)

  res.json(req.body)
  
  console.log(`Producto grabado correctamente`);
});

routerProductos.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const productToUpd = req.body;
  const result = await product.actualizarById(id, productToUpd);
  res.json(result);
});

routerProductos.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = product.deleteById(id);
  res.json(result);
});

routerProductos.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const filter = await product.getProductById(id) ;
  res.json(filter);
})





module.exports = routerProductos;
