//sql import
const { options } = require("../../dataBase/SQL/options/mariaDB");

const knex = require("knex")(options);

const getTime = require('../lib/utils')

class Productos{

    constructor(id, title, description, stock, price, thumbnail) {
        this.title = title;
        this.price = parseFloat(price);
        this.description = description;
        this.stock = parseInt(stock);
        this.thumbnail = thumbnail;
        this.id = id;
        this.timestamp = getTime();
      }

      async getAll() {
        try{
          const productObtenidos = await this.readProducts()
          
          const suport = []
          productObtenidos.forEach(elem => {
            if(elem.title != " ")
            suport.push(elem)
          });
          
          return suport
        } catch (error) {
          return console.log( `hay error ${error.message}`)
        }
      }

      async saveNewProduct(newProduct){
        try {
          const data = await this.getAll()
          console.log(data);
          let newid 
          const lastIndex = data.length-1
          if(data.length != 0){
            newid = parseInt(data[lastIndex].id)
            newid++
            
          }else{
            newid = 1
          }
        
          newProduct.id = newid
          console.log(newProduct);
          this.addProductosSQL(newProduct)
          
        }catch (error){
          console.log(`saveNewProducto ${error.message}`);

        }
      }

      async getById(id) {
        try {
          const products = await this.getAll();
          console.log(products);
          const indexProduct = products.findIndex((product) => product.id == id);
          if (indexProduct === -1) {
            return console.log(`producto no encontrado`);
          }
          else{
            const productFiltered = []
            productFiltered.push(products[indexProduct])
            return productFiltered
          }
        } catch (error) {
          return console.log( "Error al obtener el producto");
        }
      }
      
      async deleteById(id) {
        try {
            

          knex.from('productos').where(`id`,`=`,`${id}`).del()
          .then(()=> console.log( `producto id No ${id} borrado`) )
          .catch(error => console.log(error.message))
          
          
          
        } catch (error) {
          console.log(error.message);;
        }
      }

      async deleteAll() {
        try {
          await fs.promises.writeFile("../data/productos.txt", "[]");
    
          return returnMessage(false, "Productos eliminados", null);
        } catch (error) {
          return returnMessage(true, "Error al eliminar los productos", null);
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
    
          this.updateProductSQL(id, newProduct)

          console.log(`producto actualizado correctamente`);

        } catch (error) {
         console.log(`error en actualizar producto ${error.message}`);
        }
      }

      //sql

    

      addProductosSQL = (data) => {
        knex('productos').insert(data).then(()=>{
          console.log(`productos agregados a MariaDB`);
        }).catch( (err) =>{
          console.log(`error en iniciar tabla ${err.message}`);
        })
      }

      readProducts = () => {
        const todosLosP = knex('productos').select('*').then((data) => {
          
        const productosDB =  this.baseJsonProductos(data)
          
        return productosDB

        }).catch( (err) =>{
          return console.log(`error en iniciar tabla ${err.message}`);
        })
        
        return todosLosP
      }

      updateProductSQL = (idTo,newUpdate) =>{
        console.log(idTo);
        console.log(newUpdate);
        knex('productos').where(idTo).update(newUpdate).then(()=>{
          console.log(`producto actualizado`);
        }).catch( (err) =>{
          console.log(`error en actualizar sql ${err.message}`);
        })
      }

      async crearTablaProducto()  {

        try {
            const tablaProductos = await knex.schema.hasTable('productos')
            if (tablaProductos) {
                console.log(`La tabla productos ya se encuentra creada`);
            }
            else {
                await knex.schema.createTable('productos', (table) =>{
                    table.increments('id'),
                    table.string('title', 200).notNullable(),
                    table.float('price').notNullable(),
                    table.string('description',200).notNullable(),
                    table.timestamp('timestamp')
                    table.string('thumbnail',200).notNullable(),
                    table.integer('stock').notNullable()
                })
                console.log(`La tabla productos fue Creada`)
            }
            }catch (err) {
                console.log(`hay un error en funcion crearTablaProducto ${err.message}`);
            }
        }

        async  crearTablaOrders(){
        try {
            const tablaOrders = await knex.schema.hasTable('orders');
            if (tablaOrders) {
                console.log(`La tabla carrito ya  fue creada`);
            } else {
    
                await knex.schema.createTable('orders', (table)=>{
                    table.increment('id'),
                    table.string('products', 300),
                    table.timestamp('timestamp')
                })
                console.log(`tabla orders creada`);
            }
        }catch(error){
            console.log(`error en crearTablaOrders ${error.message}`);
        }
      }

      baseJsonProductos = (data) => {

        console.log(data);
        const allProductsSQL = data.map((product)=>{return product})

          return allProductsSQL;
      }

    

    

}

module.exports = Productos