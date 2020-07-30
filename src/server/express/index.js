import Path from "path";
import express from "express";
import { middleware as ssrMiddleware } from "./ssr-middleware";
import { graphqlMiddleware2 } from "./graphql-middleware";
import chalk from "chalk";
import Status from "http-status";

const PORT = process.env.PORT || 3000;
const touch = process.env.touch;
const app = express();

app.get("/alive", (_, res) => {
  res.status(Status.OK).end();
});

app.use(express.static(Path.resolve("dist"), { maxAge: "30d", index: false }));

app.use(graphqlMiddleware2);

app.get("*", ssrMiddleware);

const running = app.listen(PORT, () => {
  console.log(
    chalk.bold.blue(`Express server is running at http://localhost:${PORT}`),
  );
  if (touch && running.close) {
    running.close();
    process.exit(0);
  }
});
