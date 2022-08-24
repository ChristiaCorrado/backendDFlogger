const mongoose = require("mongoose");
const User = require("../../dataBase/mongo/schemaUsersMongo");
const bcrypt = require('bcrypt-nodejs')
const dotenv = require('dotenv')


dotenv.config()

class ContenedorUsersMongoDB {
  constructor() {}

  async connectMongoose() {
    try {
      const URL = process.env.URL_MONGO;
      let rta = mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    } catch {
      (err) => {

      };
    }
  }

  async getAll() {
    try {
      await this.connectMongoose();

      let allUsers = await User.find({});
      
      return allUsers;
    } catch (error) {

    }
  }

  async saveNewUser(newUser) {
    try {

      await this.connectMongoose();

      newUser.avatar =  'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
      newUser.cartId = `none`

      const userReg = new User()
      userReg.name = newUser.name
      userReg.lastName = newUser.lastName
      userReg.city = newUser.city
      userReg.username = newUser.username
      userReg.password = userReg.encryptPassword(newUser.password) 
      userReg.email = newUser.email
      userReg.zip = newUser.zip
      userReg.cartId = newUser.cartId
      userReg.avatar = newUser.avatar
      return await userReg.save()
      
       
      
    
    } catch (error) {

    }
  } 

  async findUser(username, password) {
    try {
      await this.connectMongoose();
      
      const resultUser = await User.findOne({username:username});
      
       
      const test = bcrypt.compareSync(password, resultUser.password )


      if(!resultUser){
        return null
      }
      if(test === true){

        return resultUser
      }
      
    } catch (error) {

    }
  }

  async findOne(id) {
    try {
      await this.connectMongoose();
      const result = await User.findById(id);

      if (result.length = 0) {
        return null
      }else{

        return result;
      }
      
    } catch (error) {

    }
  }

  async addIdCart(idUser,idCarttoADD) {
    try{
      await this.connectMongoose()

      const result = await User.findOneAndUpdate(idUser, {cartId: idCarttoADD})

      
      return await result.save();
    }catch (error) {
   
    }
  }
  
}


module.exports = ContenedorUsersMongoDB