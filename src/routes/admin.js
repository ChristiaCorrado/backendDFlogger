//express import
const express = require("express");
const admin = express.Router();

const productoDao = require("../DAOs/products/prductsDaoMongoDb")
const product = new productoDao


admin.post( 'logout', (req, res)=>{

  res.redirect('/login');

  
})

admin.get(`/agregarProductos`,(req, res)=>{
  const message = req.flash('mensaje')[0];

  res.render(`admAddProd`,{message})
})


admin.get("/actualizarProductos", async (req, res) => {
  
  allArticles = await product.getAll()
  
  res.render('admModifProd', allArticles)
});


module.exports = admin;

