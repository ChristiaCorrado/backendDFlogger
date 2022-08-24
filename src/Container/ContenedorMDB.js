const dotenv = require('dotenv')
const mongoose = require("mongoose");
const productSchema = require("../../dataBase/mongo/schemaProductMDB");

dotenv.config()

class ContenedorMongoDB {
  constructor() {}

  async connectMongoose() {
    try {
      const URL = process.env.URL_MONGO
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

      let allArticles = await productSchema.find();

      return allArticles;
    } catch (error) {

    }
  }

  async saveNewProduct(newProduct) {
    try {

      await this.connectMongoose();
      const data = await this.getAll();

      const time = new Date().toLocaleString();
      let newid;
      const lastIndex = data.length - 1;

      if (data.length != 0) {
        newid = parseInt(data[lastIndex].id);
        newid++;
      } else {
        newid = 1;
      }

      newProduct.id = newid;
      newProduct.time = time;



      await productSchema.create(newProduct);
      await mongoose.disconnect();
    } catch (error) {

    }
  }

  async getProductById(id) {
    try {
      await this.connectMongoose();
      const result = await productSchema.findById(id);
      return result;
    } catch (error) {

    }
  }

  async deleteById(idToEliminate) {
    try {
      await this.connectMongoose();

      return result;
    } catch (error) {

    }
  }

  async actualizarById(idFinded, newProduct) {
    try {
      await this.connectMongoose();
      let productUpdate = await productSchema.updateOne(
        { _id: idFinded },
        { $set: newProduct }
      );

    } catch (error) {

    }
  }


}

module.exports = ContenedorMongoDB;
