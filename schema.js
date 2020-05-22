import {GraphQLObjectType, GraphQLBoolean, GraphQLID, GraphQLString, 
    GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLFloat } from 'graphql';
import Product from './models/productModel';

var ProductType = new GraphQLObjectType({
    name: 'product',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Product id'
        },
        brand: {
            type: GraphQLString,
            description: 'Product brand'
        },
        model: {
            type: GraphQLString,
            description: 'Product model'
        },
        price: {
            type: GraphQLFloat,
            description: 'Product price'
        },
        url: {
            type: GraphQLString,
            description: 'Product url'
        },
        category: {
            type: GraphQLString,
            description: 'Product category'
        },
        img: {
            type: GraphQLString,
            description: 'Product image'
        },
    })
})

var ProductQuery = new GraphQLObjectType({
    name: 'ProductQuery',
    fields: () => ({
      products: {
        type: new GraphQLList(ProductType),
        resolve: () => {
            return new Promise((resolve, reject) => {
                Product.find((err, todos) => {
                    if (err) reject(err)
                    else resolve(todos)
                })
            })
        }
      }
    })
});

module.exports = new GraphQLSchema({
    query: ProductQuery,
})
  