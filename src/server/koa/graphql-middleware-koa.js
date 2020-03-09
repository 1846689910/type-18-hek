import { schema, rootValue } from "../express/graphql-middleware";
import { graphql } from "graphql";

const graphqlMiddlewareKoa = async ctx => {
  const { query } = ctx.request.body;
  ctx.body = await graphql(schema, query, rootValue);
};

module.exports = { graphqlMiddlewareKoa };
