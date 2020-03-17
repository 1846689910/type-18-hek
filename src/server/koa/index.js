import Path from "path";
import Koa from "koa";
import serve from "koa-static";
import Router from "koa-router";
// import koaBody from "koa-body";
import { middleware as ssrMiddleware } from "../express/ssr-middleware";
import { graphqlMiddlewareKoa2 } from "./graphql-middleware-koa";

import c2k from "koa-connect";
import chalk from "chalk";

const PORT = process.env.PORT || 3000;
const app = new Koa();
const router = new Router(); // eslint-disable-line

app.use(graphqlMiddlewareKoa2);

app.use(serve(Path.resolve("dist"), { maxAge: "30d", index: false }));

app.use(router.routes());

app.use(c2k(ssrMiddleware));

app.listen(PORT, () =>
  console.log(
    chalk.bold.blue(`Koa server is running at http://localhost:${PORT}`)
  )
);
