const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    name: {type: String , required: true, max:100},
    lastName: { type: String, required: true, max:100},
    username: { type: String, required: true, max:100},
    email: { type: String, require: true, max: 30000},
    city: { type: String, required: true, max:200},
    password: { type: String, required: true, max: 30000},
    zip:{ type: String, required: true, max: 30000}
})


userSchema.methods.encryptPassword =(password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.decryptPassword = (password) => {
    return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('usuarios', userSchema)