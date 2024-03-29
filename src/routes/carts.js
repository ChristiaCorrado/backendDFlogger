//container import
const cartDao = require("../DAOs/cart/cartDaoFirebase");
const userDao = require("../DAOs/users/usersDao")

const cartC = new cartDao
const cartUser = new userDao

//EMAILSENDER
const htmlTemplate = require("../Notificacion/gmail/compraNotificacion");

//express import
const express = require("express");
const routerCarrito = express.Router();

routerCarrito.get("/",async (req, res, next) => {

  const userId = req.session.passport

 
  const noIdCart = await cartUser.findOne(userId.user)

  let userCart 

  if(noIdCart.cartId === 'none'){
    
    const cartId = await cartC.saveCart({});

    const newData = await cartUser.addIdCart( {_id : userId.user},cartId)

    
    userCart = cartId

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

  res.render(`cart`,{userCart,id});
});

routerCarrito.post("/:id/productos", async (req, res) => {
  const idProducto = req.params.id;

  const userId = req.session.passport

  
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

      const cartActualizado = await cartC.addProductToCartById(userCart, {_id:idProducto});

  
    }
    

  
  
    res.redirect(`/api/cart/${userCart}/productos`);
  }

});

routerCarrito.delete("/:id/productos/:productId", async (req, res) => {
  const id = req.params.id;
  const productId = req.params.productId;
 

  const cart = await cartC.deleteProductCartById(id, productId);


  res.redirect(`/api/cart/${id}/productos`);
})


routerCarrito.post("/:id/buy",async (req, res) => {
  const idCart = req.params.id;

  const articulos = await cartC.getCartById(idCart);
  const userCart = articulos.article

  const userId = req.session.passport
 
  const datauser = await cartUser.findOne(userId.user)
  const email = datauser.email;

  const mensaje = `
    <div>
      ${htmlTemplate.compraToBuyer(userCart)}
      <h2>Gracias por comprar en NFT ART!</h2>
    </div>                  

  `

  htmlTemplate.sendGmailCompra(email, mensaje);

  const clear = await cartC.clearCart(idCart)

  res.render(`compraExitosa`)
});




module.exports = routerCarrito