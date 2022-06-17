const fs = require("fs");
const { filtarPorId } = require("../lib/utils");

class ContainerArchivo {
  constructor(pathProducts, pathCart) {
    this.pathProducts = `./dataBase/memoria/products.txt`;
    this.pathCart = `./dataBase/memoria/carts.txt`;
  }

  async getAll() {
    try {
      const productObtenidos = JSON.parse(await this.readProductsTXT());

      return productObtenidos;
    } catch (error) {
      return console.log(`hay error ${error.message}`);
    }
  }

  async saveNewProduct(newProduct) {
    try {
      const data = await this.getAll();
      console.log(data);
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
      data.push(newProduct);
      console.log(newProduct);
      await fs.promises.writeFile(
        this.pathProducts,
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.log(`saveNewProducto ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const data = await this.getAll();
      console.log(data);
      let result = filtarPorId(data, id);
      console.log(result);
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

  async actualizarById(id, newProduct) {
    try {
      const products = await this.getAll();

      const indexProduct = products.findIndex((product) => product.id == id);
      if (indexProduct === -1) {
        return console.log(`producto no encontrado`);
      }
      const productToBeUpdated = products[indexProduct];

      if (newProduct.title) {
        productToBeUpdated.title = newProduct.title;
      }
      if (newProduct.description) {
        productToBeUpdated.description = newProduct.description;
      }
      if (newProduct.stock) {
        productToBeUpdated.stock = parseInt(newProduct.stock);
      }
      if (newProduct.price) {
        productToBeUpdated.price = parseFloat(newProduct.price);
      }
      if (newProduct.thumbnail) {
        productToBeUpdated.thumbnail = newProduct.thumbnail;
      }

      products[indexProduct] = productToBeUpdated;

      await fs.promises.writeFile(
        this.pathProducts,
        JSON.stringify(products, null, 2)
      );

      console.log(`producto actualizado correctamente`);
    } catch (error) {
      console.log(`error en actualizar producto ${error.message}`);
    }
  }

  //CART CONTAINER

  async createDataCart(e) {
    try {
      await fs.promises.writeFile("./data/carrito.txt", JSON.stringify(e));
      console.log("nuevo archivo creado");
    } catch (err) {}
  }

  async getAllCarts() {
    try {
      const data = JSON.parse(
        await fs.promises.readFile(this.pathCart, "utf-8")
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async saveCart(nuevoCarrito) {
    try {
      const data = await this.getAllCarts();

      if (data.length == 0) {
        const cartBuyer = {
          id: 1,
          cart: nuevoCarrito,
        };
        data.push(cartBuyer);
      } else {
        const lastIndex = data.length - 1;
        console.log(data[lastIndex].id);
        let newid = parseInt(data[lastIndex].id);
        newid++;
        const cartBuyer = {
          id: newid,
          cart: nuevoCarrito,
        };
        data.push(cartBuyer);
      }

      await fs.promises.writeFile(this.pathCart, JSON.stringify(data, null, 2));

      return data;
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteCartById(id) {
    try {
      const dataCarts = await this.getAllCarts();
      const eliminatedCart = dataCarts.find((cart) => {
        return cart.id === id;
      });
      if (!eliminatedCart) {
        console.log("El carrito no existe");
      }
      const cartsFiltered = dataCarts.filter((cart) => cart.id !== id);
      await fs.promises.writeFile(
        this.pathCart,
        JSON.stringify(cartsFiltered, null, 2)
      );
      return console.log("Carrito eliminado", eliminatedCart);
    } catch (error) {
      return console.log("Error al eliminar el Carrito", error.message);
    }
  }

  async addProductToCartById(id, product) {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === id);
      if (cartIndex === -1) {
        return console.log(true, "El carrito no existe", null);
      }
      const cartAux = carts[cartIndex];
      console.log(cartAux);
      const aproduct = cartAux.cart;
      const cartUpdate = [...aproduct, product];
      cartAux.cart = cartUpdate;

      carts[cartIndex] = cartAux;
      console.log(carts[cartIndex]);

      await fs.promises.writeFile(
        this.pathCart,
        JSON.stringify(carts, null, 2)
      );

      return console.log("Producto agregado al carrito", carts[cartIndex]);
    } catch (error) {
      return console.log(
        "Error al agregar el producto al carrito",
        error.message
      );
    }
  }

  async deleteProductCartById(idCart, idProduct) {
    try {
      const allCarts = await this.getAllCarts();
      const cartIndex = allCarts.findIndex((cart) => {
        return cart.id == idCart;
      });
      if (cartIndex === -1) {
        return console.log("El carrito no existe");
      }
      const cartAux = allCarts[cartIndex];
      console.log(cartAux);
      console.log(idCart, idProduct);
      if (!cartAux.cart.find((product) => product.id == idProduct)) {
        return console.log("El producto no existe");
      }
      cartAux.cart = cartAux.cart.filter((p) => p.id !== idProduct);

      allCarts[cartIndex] = cartAux;

      await fs.promises.writeFile(
        "data/carrito.txt",
        JSON.stringify(allCarts, null, 2)
      );
      return allCarts[cartIndex];
    } catch (error) {
      return console.log(
        "Error al eliminar el producto del carrito",
        error.message
      );
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((cart) => cart.id === id);

      if (cart) {
        return cart;
      } else {
        return console.log("Carrito no encontrado");
      }
    } catch (error) {
      return console.log("Error al obtener el Carrito", null);
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

module.exports = ContainerArchivo;
