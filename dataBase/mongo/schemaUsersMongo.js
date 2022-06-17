const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: 'string', required: true, max:100},
    email: { type: String, require: true, max: 200},
    password: { type: String, required: true, max: 300}
})

module.exports = mongoose.model('usuarios', userSchema)