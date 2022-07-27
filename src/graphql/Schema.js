const {buildSchema} = require('graphql')


const schema = buildSchema(`


  type Producto {
    _id: String
    id: String
    title: String
    description: String
    price: Int
    thumbnail: String
    stock: Int
    time: String
  }
  
  type Query {
    getAllProductos: [Producto]
  }


  
`);


module.exports = {schema}