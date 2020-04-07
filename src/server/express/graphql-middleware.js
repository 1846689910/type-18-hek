const graphqlHTTP = require("express-graphql");
const { schema, root } = require("../utils/graphql");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../utils/graphql");
const http = require("http");

/**
 * @deprecated
 */
const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});

const expressApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const graphqlMiddleware2 = expressApolloServer.getMiddleware();

/**
 * generate a http server wrapper for express server
 * @param {Express} expressServer express server
 */
const getGraphqlSubscriptionsHttpServer = expressServer => {
  const httpServer = http.createServer(expressServer);
  expressApolloServer.installSubscriptionHandlers(httpServer);
  return httpServer;
};

module.exports = {
  graphqlMiddleware,
  graphqlMiddleware2,
  expressApolloServer,
  getGraphqlSubscriptionsHttpServer,
};
