const { ApolloServer }= require ("@apollo/server");
const {startStandaloneServer}= require ("@apollo/server/standalone")

const {typeDefs: productTypeDefs, resolvers: productResolvers} = require ('./schema/productSchema')
const {typeDefs: userTypeDefs, resolvers: userResolvers} = require ('./schema/userSchema')

const server = new ApolloServer ({
    typeDefs: [productTypeDefs, userTypeDefs],
    resolvers: [productResolvers, userResolvers],
    introspection: true 
}) 

startStandaloneServer(server, {
    listen: {port: 4000}
}) .then(({url}) => {
    console.log(`running app-orchestrator at port ${url}`)
})