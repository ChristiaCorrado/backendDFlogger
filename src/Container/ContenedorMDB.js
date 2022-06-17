const mongoose = require("mongoose");
const productSchema = require("../../dataBase/mongo/schemaProductMDB");

class ContenedorMongoDB {
  constructor() {}

  async connectMongoose() {
    try {
      const URL =
        "mongodb+srv://admin:1234@cluster0.d5rwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
      let rta = mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`base mongo conectada`);
    } catch {
      (err) => {
        console.log(err.message);
      };
    }
  }

  async getAll() {
    try {
      await this.connectMongoose();

      let allArticles = await productSchema.find({});

      return allArticles;
    } catch (error) {
      return console.log(`hay error ${error.message}`);
    }
  }

  async saveNewProduct(newProduct) {
    try {
      console.log(newProduct);
      await this.connectMongoose();
      const data = await this.getAll();
      console.log(data);
      const time = new Date().toLocaleString();
      let newid;
      const lastIndex = data.length - 1;
      console.log(lastIndex);
      if (data.length != 0) {
        newid = parseInt(data[lastIndex].id);
        newid++;
      } else {
        newid = 1;
      }

      newProduct.id = newid;
      newProduct.time = time;

      console.log(newProduct);

      await productSchema.create(newProduct);
      await mongoose.disconnect();
    } catch (error) {
      console.log(`saveNewProducto ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      await this.connectMongoose();
      const result = await productSchema.findById(id);
      return result;
    } catch (error) {
      return console.log("Error al obtener el producto " + error.message);
    }
  }

  async deleteById(idToEliminate) {
    try {
      const data = await this.getAll();
      console.log(data);
      let result = filtarPorId(data, idToEliminate);
      if (!result) {
        console.log("Producto no encontrado");
      }
      const productsFiltered = data.filter((e) => e.id !== idToEliminate);
      console.log(productsFiltered);

      await fs.promises.writeFile(
        this.pathProducts,
        JSON.stringify(productsFiltered, null, 2)
      );

      console.log("Producto eliminado");
    } catch (error) {
      console.log("Error al eliminar el producto" + error.message);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.pathProducts, "[]");

      console.log("Todos los Productos eliminados");
    } catch (error) {
      console.log("Error al eliminar todos los productos");
    }
  }

  async actualizarById(idFinded, newProduct) {
    try {
      await this.connectMongoose();
      let productUpdate = await productSchema.updateOne(
        { id: idFinded },
        { $set: newProduct }
      );
      console.log(`is updated ` + productUpdate);
    } catch (error) {
      console.log(`error en actualizar producto ${error.message}`);
    }
  }

  async readProductsTXT() {
    try {
      const productsTxt = [await fs.readFileSync(this.pathProducts, "utf8")];

      if (productsTxt) {
        return productsTxt;
      } else {
        console.log("No se encontro base de datos");
        fs.promises.writeFile(this.pathProducts, "[]");
        console.log("Base de datos TXT iniciada, no posee productos");
      }
    } catch {
      (err) => {
        return console.log(`error en fs readFile ${err.message}`);
      };
    }
  } //fin del constructor
}

module.exports = ContenedorMongoDB;
