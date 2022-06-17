//express import
const express = require("express");
const admin = express.Router();



admin.post( 'logout', (req, res)=>{
  console.log(req.session);
  res.redirect('/login');

  
})

module.exports = admin;
