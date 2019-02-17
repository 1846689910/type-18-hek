import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import {getHtml} from "../../template/template";
import {Provider} from "react-redux";
import configureStore from "../client/js/settings/store";
import {StaticRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {initialState} from "../client/js/settings/reducers";
import chokidar from "chokidar";
import webpackConfig from "../../webpack.config";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import logger, {FgCyan, FgGreen, Bright, Underscore} from "./utils/logger";

const app = express();
const staticPath = path.resolve( __dirname, "../../dist" );
const config = webpackConfig({ssr: true});
const port = config.devServer && config.devServer.port || 3000;
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {  // control print webpackDevMiddleware options.stats refer to https://webpack.js.org/configuration/stats/
        all: false,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true
    }
}));
app.use(webpackHotMiddleware(compiler));

// const watcher = chokidar.watch("./server");

// watcher.on("ready", () => {
//     watcher.on("all", () => {
//         console.log("Clearing /server/ module cache from server");
//         Object.keys(require.cache).forEach(id => {
//           if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
//         });
//     });
// });

app.use(express.static(staticPath));

app.get("/*", (req, res) => {
    const store = configureStore(initialState);
    const {routes} = require("../client/js/settings/routes");
    const App = () => renderRoutes(routes);
    const reactDom = renderToString(<Provider store={store}>
        <StaticRouter context={{}} location={ req.url }>
            <App/>
        </StaticRouter>
    </Provider>);
    const html = getHtml("type-18-ssr", reactDom, store);
    res.status(200).type("text/html").send(html);
});

compiler.plugin("done", () => {
    logger("Clearing /client/ module cache from server", [FgCyan, Bright]);
    Object.keys(require.cache).forEach(id => {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
    process.nextTick(() => logger(`\n\nexpress server running at: ${Underscore}http://localhost:${port}\n\n`, [FgGreen, Bright]));
});

app.listen(port);
