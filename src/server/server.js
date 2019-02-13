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

const app = express();
const staticPath = path.resolve( __dirname, "../../dist" );
const config = webpackConfig({ssr: true});
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

const watcher = chokidar.watch("./server");

watcher.on("ready", () => {
    watcher.on("all", () => {
        console.log("Clearing /server/ module cache from server");
        Object.keys(require.cache).forEach(id => {
          if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
        });
    });
});

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
    console.log("Clearing /client/ module cache from server");
    Object.keys(require.cache).forEach(id => {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
});

app.listen(8080, () => {
    console.log("server started");
});
