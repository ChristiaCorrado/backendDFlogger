//container import
const cartDao = require("../DAOs/cart/cartDaoFirebase");
const userDao = require("../DAOs/users/usersDao")

const cartC = new cartDao
const cartUser = new userDao


//express import
const express = require("express");
const routerCarrito = express.Router();

routerCarrito.post("/",async (req, res, next) => {

  const userId = req.session.passport
  console.log(userId);
 
  const noIdCart = await cartUser.findOne(userId.user)

  let userCart 

  if(noIdCart.cartId === 'none'){
    
    const cart = await cartC.saveCart();
    userCart = await cartUser.addIdCart( {_id : userId.user},cart)
    
  } else {
    userCart = noIdCart.cartId
    
  }
  

    res.redirect(`cart/${userCart}/productos`);


});

routerCarrito.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await cartC.deleteCartById(id);
  res.json(cart);
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const id = req.params.id;
  const articulos = await cartC.getCartById(id);
  const userCart = articulos.article
  console.log(userCart);
  res.render(`cart`,{userCart});
});

routerCarrito.post("/:id/productos", async (req, res) => {
  const idProducto = req.params.id;

  const userId = req.session.passport
  console.log(userId);
  
  if(userId === undefined){
    res.redirect(`/nologed`)
  }else{

    const noIdCart = await cartUser.findOne(userId.user)
  
    let userCart 
  
    if(noIdCart.cartId === 'none'){
      
      const cart = await cartC.saveCart({});
      userCart = await cartUser.addIdCart( {_id : userId.user},cart)
      
    } else {
      userCart = noIdCart.cartId
      console.log(userCart);
      const cartActualizado = await cartC.addProductToCartById(userCart, {_id:idProducto});
      console.log(cartActualizado);
  
    }
  
  
    res.redirect(`/api/cart/${userCart}/productos`);
  }

});

routerCarrito.delete("/:id/productos/:productId", async (req, res) => {
  const id = req.params.id;
  const productId = req.params.productId;
 
  console.log(id);
  console.log(productId);
  const cart = await cartC.deleteProductCartById(id, productId);
  
});

routerCarrito.get("/", async (req, res) => {
  
  const cart = await cartC.getAllCarts();
  res.json(cart);
});


module.exports = routerCarrito