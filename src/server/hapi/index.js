import Path from "path";
import Hapi from "hapi";
import chalk from "chalk";
import Loadable from "react-loadable";
const PORT = process.env.PORT || 3000;
const staticRoot = Path.resolve("dist");

const server = Hapi.server({
  port: PORT,
  host: "localhost"
});
(async () => {
  await server.register([
    { plugin: require("./ssr-plugin"), options: { staticRoot } },
    require("inert") // configure plugin inert to load static resources
  ]);
  await Loadable.preloadAll();
  await server.start();
  
  console.log(chalk.bold.blue(`Hapi server running at: ${server.info.uri}`));
})();
