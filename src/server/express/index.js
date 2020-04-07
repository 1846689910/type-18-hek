import Path from "path";
import express from "express";
import { middleware as ssrMiddleware } from "./ssr-middleware";
import { graphqlMiddleware2, expressApolloServer } from "./graphql-middleware";
import chalk from "chalk";
import { publishServerTime } from "../utils/utils";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(Path.resolve("dist"), { maxAge: "30d", index: false }));

app.use(graphqlMiddleware2);

app.get("*", ssrMiddleware);

const httpServer = app.listen(PORT, () => {
  console.log(
    chalk.bold.blue(`Express server is running at http://localhost:${PORT}`),
  );
  console.log(
    chalk.yellow(`
      - graphql at http://localhost:${PORT}${expressApolloServer.graphqlPath}
      - apollo graphql subscriptions at ws://localhost:${PORT}${expressApolloServer.subscriptionsPath}
  `),
  );
  publishServerTime();
});

expressApolloServer.installSubscriptionHandlers(httpServer);
