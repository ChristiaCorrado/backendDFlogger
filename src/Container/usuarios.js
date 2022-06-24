const mongoose = require("mongoose");
const User = require("../../dataBase/mongo/schemaUsersMongo");
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
      console.log(`base Users mongo conectada`);
    } catch {
      (err) => {
        console.log(err.message);
      };
    }
  }

  async getAll() {
    try {
      await this.connectMongoose();

      let allUsers = await User.find({});
      
      return allUsers;
    } catch (error) {
      return console.log(`hay error ${error.message}`);
    }
  }

  async saveNewUser(newUser) {
    try {
      console.log(newUser);
      await this.connectMongoose();

      const userReg = new User()
      userReg.username = newUser.username
      userReg.password = userReg.encryptPassword(newUser.password) 
      userReg.email = userReg.encryptPassword(newUser.email)

      return await userReg.save()
      
       
      
    
    } catch (error) {
      console.log(`saveNewUser ${error.message}`);
    }
  } 

  async findUser(username, password) {
    try {
      await this.connectMongoose();
      
      const resultUser = await User.findOne({username:username});

      if (!resultUser) {
        return null
      }
      if(!resultUser.decryptPassword(password)){
        return resultUser
      }
      
      
    } catch (error) {
      return console.log("Error al obtener el usuario " + error.message);
    }
  }

  async findOne(id) {
    try {
      await this.connectMongoose();
      const result = await User.findById(id);

      if (result.length==0) {
        return null
      }else{

        return result;
      }
      
    } catch (error) {
      return console.log("Error al obtener el usuario " + error.message);
    }
  }

}

module.exports = ContenedorUsersMongoDB