//container import
const productoDao = require("../DAOs/products/prductsDaoMongoDb");
const product = new productoDao

//express import
const express = require("express");
const routerProductos = express.Router();


routerProductos.get("/", async (req, res) => {
  
  allArticles = await product.getAll()

  res.render('allProducts', allArticles)
});

routerProductos.post("/addProduct", async (req, res) => {

  const newArticle = req.body

  await product.saveNewProduct(req.body)
  req.flash(`mensaje`,`producto agregado`)

  res.redirect(`/api/admin/agregarProductos`)  
  
  
});

routerProductos.put("/:id", async (req, res) => {
  const id = req.params.id;
  const productToUpd = req.body;

  const result = await product.actualizarById(id, productToUpd);
  res.json(result);
});

routerProductos.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = product.deleteById(id);
  res.json(result);
});

routerProductos.get("/:id", async (req, res) => {
 
  const producto = [await product.getProductById(req.params.id)] ;
  res.render('producto', {producto})
})







module.exports = routerProductos;
