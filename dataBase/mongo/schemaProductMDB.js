const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {type: 'string', required: true, max:100},
    description: { type: String, require: true, max: 200},
    price: { type: Number, required: true},
    thumbnail: { type: String, require: true, max: 300},
    stock: { type: Number, required: true},
    id: { type: Number, required: true},
    time: { type: String, required: true, max: 100}
})

module.exports = mongoose.model('productos', productSchema)