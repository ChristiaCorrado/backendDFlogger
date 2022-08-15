const express = require("express");
const router = express.Router();

const product = require('./allProducts')
const carts = require('./carts')
const admin = require('./admin')
const chat = require('./chat')

router.use('/productos', product)
router.use('/cart', carts)
router.use('/admin', admin)
router.use(`/chat`, chat) 

module.exports = router