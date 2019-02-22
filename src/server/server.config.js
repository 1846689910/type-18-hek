import path from "path";
import webpackConfig from "../../webpack.config";
const webpackEnv = {
  ssr: true,
  production: true
};
const config = webpackConfig(webpackEnv);
const staticPath = path.resolve(__dirname, "../../../dist");
const webpackDevMiddlewareOptions = {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    // control print webpackDevMiddleware options.stats refer to https://webpack.js.org/configuration/stats/
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  }
};
const port = (config.devServer && config.devServer.port) || 3000;
export { config, webpackEnv, staticPath, webpackDevMiddlewareOptions, port };
