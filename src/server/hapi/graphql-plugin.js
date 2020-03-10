import { schema, root } from "../utils/graphql";
import { graphql } from "graphql";

module.exports = {
  name: "GraphQL-Plugin",
  version: "1.0.0",
  register: async function(server) {
    server.route({
      method: "POST",
      path: "/graphql",
      handler: async (request, h) => {
        const { query } = request.payload;
        const response = h.response(await graphql(schema, query, root));
        return response;
      }
    });
  }
};
