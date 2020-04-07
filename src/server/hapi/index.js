import Path from "path";
import Hapi from "hapi";
import chalk from "chalk";
import { apolloServerHapi } from "./graphql-middleware-hapi";
import { publishServerTime } from "../utils/utils";

const PORT = process.env.PORT || 3000;
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

  await apolloServerHapi.applyMiddleware({ app: server });

  await apolloServerHapi.installSubscriptionHandlers(server.listener);

  await server.start();
  
  console.log(chalk.bold.blue(`Hapi server running at: ${server.info.uri}`));
  console.log(
    chalk.yellow(`
      - graphql at http://localhost:${PORT}${apolloServerHapi.graphqlPath}
      - apollo graphql subscriptions at ws://localhost:${PORT}${apolloServerHapi.subscriptionsPath}
  `),
  );
  publishServerTime();
})();
