const express = require("express");
const router = express.Router();

const product = require('./allProducts')
const carts = require('./carts')
const admin = require('./admin')

router.use('/productos', product)
router.use('/cart', carts)
router.use('/admin', admin)

module.exports = router