//container import
const productoDao = require("../DAOs/products/prductsDaoMongoDb");
const product = new productoDao

//express
const express = require("express");

const graphql = express.Router();




//graphql
const {schema} = require('../graphql/Schema')
const {graphqlHTTP} = require('express-graphql');



async function getAllProductos() { 
    return allproducts = await product.getAll()
}

graphql.use('/graphql',graphqlHTTP({

    schema,
    rootValue: {
        getAllProductos
    },

    graphiql: true,
}));

module.exports = graphql;



