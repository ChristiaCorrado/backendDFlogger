const admin = require("firebase-admin");
const serviceAccount = require("../../dataBase/firebase/ecommercentf-firebase-adminsdk-h867s-4894494d42.json");
const productoDao = require("../DAOs/products/prductsDaoMongoDb")
const products = new productoDao


class ContenedorCartsF {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async getAllCarts() {
    const db = admin.firestore();
    const query = db.collection("carritos");

    try {
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      const item = docs.map((doc) => ({
        id: doc.id,
        productos: doc.data(),
      }));

      if (item) {
        return item;
      } else {
        
      }
    } catch (error) {
      
    }
  }

  async saveCart(nuevoCarrito) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    let today = new Date().toLocaleString();
    
    try {
      const newCart = await query
        .add({
          timestamp: today,
          article: nuevoCarrito,
        })
        .then((docRef) => {
          return docRef.id;
        })
        .catch((error) => console.error("Error adding document: ", error));
      return newCart;
    } catch (error) {
    
    }
  }

  async deleteCartById(id) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    try {
      
      let idTodelete = id.toString();
   
      const doc = query
        .doc(`${idTodelete}`)
        .delete()
        .then((e) => {
          
        })
        .catch((error) => {
          
        });
   
    } catch (error) {
      
    }
  }

  async addProductToCartById(idCart, idProd) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    const time = new Date().toLocaleString();
    const productToAdd = JSON.parse(JSON.stringify(await products.getProductById(idProd)))

    let support = []
    try {
      var docRef = await this.getCartById(idCart)

      if(docRef.article.length > 0)

      support = docRef.article

      if (support) {
      
        const newCart = {
          article: [...support, productToAdd ],
          timestamp:time
        } 
        
        
   
        const updated = await query.doc(idCart).set(newCart)
        
      }else{
       
        
        const nCart = {
          article: [ productToAdd ],
          timestamp:time
        } 

        const updated = await query.doc(idCart).set(nCart)
        
      }
    } catch (error) {
     
    }
  }

  async deleteProductCartById(idCart, idProduct) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    const time = new Date().toLocaleString();

    try {

      var docRef = await this.getCartById(idCart)
      const support = docRef.article

      const deleteProd = support.filter((p) => p._id != idProduct);
      


      const newCart = {
        article: deleteProd,
        timestamp:time
      } 
      
      
      
      const updated = await query.doc(idCart).set(newCart)

    } catch (error) {


    }
    
  }

  async getCartById(id) {
    try {
      const db = admin.firestore();
      const query = db.collection("carritos");
      const doc = query.doc(String(id));
      const finded = await doc.get()

      if (finded) {
        return finded.data();
      } else {

      }
    } catch (error) {

    }
  }
}

module.exports = ContenedorCartsF;
