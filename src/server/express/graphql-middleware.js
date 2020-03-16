// TODO: https://graphql.org/code/#express-graphql-graphql-js-running-an-express-graphql-server-github-https-github-com-graphql-express-graphql-npm-https-www-npmjs-com-package-express-graphql
const graphqlHTTP = require("express-graphql");
const { schema, root } = require("../utils/graphql");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../utils/graphql");


const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
});

const graphqlMiddleware2 = new ApolloServer({
  typeDefs,
  resolvers
}).getMiddleware();

module.exports = {
  graphqlMiddleware,
  graphqlMiddleware2
};
