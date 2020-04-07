import { schema, root } from "../utils/graphql";
import { graphql } from "graphql";
import { ApolloServer } from "apollo-server-koa";
import { typeDefs, resolvers } from "../utils/graphql";
import http from "http";
/**
 * @deprecated
 * @param {Object} ctx
 */
const graphqlMiddlewareKoa = async (ctx) => {
  const { query } = ctx.request.body;
  console.log(query);
  ctx.body = await graphql(schema, query, root);
};

const koaApolloServer = new ApolloServer({ typeDefs, resolvers });

const graphqlMiddlewareKoa2 = koaApolloServer.getMiddleware();

/**
 * @deprecated
 * @description generate a http server wrapper for koa server
 * @param {Koa} koaServer koa server
 */
const getGraphqlSubscriptionsHttpServer = (koaServer) => {
  const httpServer = http.createServer(koaServer);
  koaApolloServer.installSubscriptionHandlers(httpServer);
  return httpServer;
};

module.exports = {
  graphqlMiddlewareKoa,
  graphqlMiddlewareKoa2,
  koaApolloServer,
  getGraphqlSubscriptionsHttpServer,
};
