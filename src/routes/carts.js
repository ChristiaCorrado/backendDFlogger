//container import
const cartDao = require("../DAOs/cart/cartDaoFirebase");
const cartC = new cartDao



//express import
const express = require("express");
const routerCarrito = express.Router();

routerCarrito.post("/",async (req, res) => {
  console.log(req.body);
  const productInCart = req.body;
  const cart = await cartC.saveCart(productInCart);
  res.json(cart);
});

routerCarrito.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await cartC.deleteCartById(id);
  res.json(cart);
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const id = req.params.id;
  const cart = await cartC.getCartById(id);
  res.json(cart);
});

routerCarrito.post("/:id/productos", async (req, res) => {
  const id = req.params.id;
  const products = req.body;
  const cartActualizado = await cartC.addProductToCartById(id, products);
  res.json(cartActualizado);
});

routerCarrito.delete("/:id/productos/:productId", async (req, res) => {
  const id = req.params.id;
  const productId = req.params.productId;
 
  console.log(id);
  console.log(productId);
  const cart = await cartC.deleteProductCartById(id, productId);
  res.json(cart);
});

routerCarrito.get("/", async (req, res) => {
  
  const cart = await cartC.getAllCarts();
  res.json(cart);
});


module.exports = routerCarrito