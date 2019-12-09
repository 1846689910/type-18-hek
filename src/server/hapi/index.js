import Path from "path";
import Hapi from "hapi";
import { getRenderedString } from "../express/ssr-middleware";
const PORT = process.env.PORT || 3000;

const server = Hapi.server({
  port: PORT,
  host: "localhost",
  routes: {
    files: {
      relativeTo: Path.resolve("dist")
    }
  }
});
(async () => {
  await server.register([
    require("inert") // configure plugin inert to load static resources
  ]);
  server.route([
    {
      method: "GET",
      path: "/{any*}",
      handler: (request, h) => {
        console.log(request.url);
        const response = h.response(getRenderedString(request.url)).code(200);
        return response;
      }
    }
  ]); // pass in route object or array of route object
  await server.start();
  console.log(`hapi Server running at: ${server.info.uri}`);
})();
