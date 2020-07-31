import Path from "path";
import Hapi from "hapi";
import chalk from "chalk";
import { apolloServerHapi } from "./graphql-middleware-hapi";

const PORT = process.env.PORT || 3000;
const touch = process.env.touch;
const staticRoot = Path.resolve("dist");

const server = Hapi.server({
  port: PORT,
  host: "localhost",
});
(async () => {
  await server.register([
    { plugin: require("./ssr-plugin"), options: { staticRoot } },
    require("inert"), // configure plugin inert to load static resources
  ]);

  await server.route([
    {
      method: "GET",
      path: "/alive",
      handler: async (request, h) => {
        return h.response().code(200);
      },
    },
  ]);

  await apolloServerHapi.applyMiddleware({ app: server });

  await server.start();

  console.log(chalk.bold.blue(`Hapi server running at: ${server.info.uri}`));
  if (touch && server.stop) {
    server.stop();
    process.exit(0);
  }
})();
