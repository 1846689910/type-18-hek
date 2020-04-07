import Path from "path";
import express from "express";
import { middleware as ssrMiddleware } from "./ssr-middleware";
import { graphqlMiddleware2, getGraphqlSubscriptionsHttpServer, expressApolloServer } from "./graphql-middleware";
import chalk from "chalk";
import { pubServerTime } from "../utils/graphql/pubsub";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(Path.resolve("dist"), { maxAge: "30d", index: false }));

app.use(graphqlMiddleware2);

app.get("*", ssrMiddleware);

const httpServer = getGraphqlSubscriptionsHttpServer(app);

httpServer.listen(PORT, () => {
  console.log(
    chalk.bold.blue(`Express server is running at http://localhost:${PORT}`)
  );
  console.log(
    chalk.yellow(`  - graphql at http://localhost:${PORT}${expressApolloServer.graphqlPath}`)
  );
  console.log(
    chalk.yellow(`  - apollo graphql subscriptions at ws://localhost:${PORT}${expressApolloServer.subscriptionsPath}`)
  );
  publishServerTime();
});

function publishServerTime(){
  pubServerTime();
  setTimeout(publishServerTime, 1000);
}

/*
@deprecated: for express server without subscriptions
app.listen(PORT, () => {
  console.log(
    chalk.bold.blue(`Express server is running at http://localhost:${PORT}`)
  );
});
*/