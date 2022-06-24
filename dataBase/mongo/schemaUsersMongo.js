const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    username: {type: 'string', required: true, max:100},
    email: { type: String, require: true, max: 30000},
    password: { type: String, required: true, max: 30000}
})


userSchema.methods.encryptPassword =(password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.decryptPassword = () => {
    return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('usuarios', userSchema)