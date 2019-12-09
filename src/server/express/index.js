import Path from "path";
import express from "express";
import { middleware as ssrMiddleware } from "./ssr-middleware";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(Path.resolve("dist"), { maxAge: "30d", index: false }));

app.get("*", ssrMiddleware);

app.listen(PORT, () => {
  console.log(`express server is running on port ${PORT}`);
});
