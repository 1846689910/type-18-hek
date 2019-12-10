import Path from "path";
import { getRenderedString } from "../express/ssr-middleware";

module.exports = {
  name: "SSR-Plugin",
  version: "1.0.0",
  register: async function(server, options) {
    server.route({
      method: "GET",
      path: "/{any*}",
      handler: (request, h) => {
        const { pathname } = request.url;
        if (pathname.match(/(static)?.*\..+$/)) {
          return h.file(Path.join(options.staticRoot, request.path));
        }
        const response = h.response(getRenderedString(pathname)).code(200);
        return response;
      }
    });
  }
};
