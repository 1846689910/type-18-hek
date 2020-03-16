import Path from "path";
import Hapi from "hapi";
import chalk from "chalk";
const PORT = process.env.PORT || 3000;
const staticRoot = Path.resolve("dist");
import { apolloServerHapi } from "./graphql-middleware-hapi";

const server = Hapi.server({
  port: PORT,
  host: "localhost"
});
(async () => {
  await server.register([
    // { plugin: require("./graphql-plugin")},
    { plugin: require("./ssr-plugin"), options: { staticRoot } },
    require("inert") // configure plugin inert to load static resources
  ]);

  await apolloServerHapi.applyMiddleware({ app: server });

  await server.start();
  
  console.log(chalk.bold.blue(`Hapi server running at: ${server.info.uri}`));
})();
