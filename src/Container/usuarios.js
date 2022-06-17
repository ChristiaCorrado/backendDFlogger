const mongoose = require("mongoose");
const userSchema = require("../../dataBase/mongo/schemaUsersMongo");

class ContenedorUsersMongoDB {
  constructor() {}

  async connectMongoose() {
    try {
      const URL =
        "mongodb+srv://admin:1234@cluster0.d5rwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

      let allUsers = await userSchema.find({});
      
      return allUsers;
    } catch (error) {
      return console.log(`hay error ${error.message}`);
    }
  }

  async saveNewUser(newUser) {
    try {
      console.log(newUser);
      await this.connectMongoose();

      await userSchema.create(newUser);
    
    } catch (error) {
      console.log(`saveNewUser ${error.message}`);
    }
  } 

  async findUser(username,password) {
    try {
      await this.connectMongoose();
      const result = await userSchema.find({username:username,password:password});

      if (result.length==0) {
        return null
      }else{

        return result;
      }
      
    } catch (error) {
      return console.log("Error al obtener el usuario " + error.message);
    }
  }

  async findOne(username) {
    try {
      await this.connectMongoose();
      const result = await userSchema.find({username:username});

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