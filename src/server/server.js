import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import {getTemplate} from "../../template/template";
import {Provider} from "react-redux";
import {routes} from "../client/js/settings/routes";
import configureStore from "../client/js/settings/store";
import {StaticRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {initialState} from "../client/js/settings/reducers";

const app = express();
const staticPath = path.resolve( __dirname, "../../dist" );

// const webpack = require("webpack");
// const webpackConfig = require("../../webpack.config");

// const config = webpackConfig({
//     ssr: true
// });
// const compiler = webpack(config);


// app.use(
//     require("webpack-dev-middleware")(compiler, {
//         noInfo: true,
//         publicPath: config.output.path,
//         stats: false
//     })
// );
// app.use(require("webpack-hot-middleware")(compiler));


app.use(express.static(staticPath));
app.get("/*", async(req, res) => {
    const store = configureStore(initialState);
    const App = () => renderRoutes(routes);
    const reactDom = renderToString(<Provider store={store}>
        <StaticRouter context={{}} location={ req.url }>
            <App/>
        </StaticRouter>
    </Provider>);
    const html = await getTemplate(staticPath, reactDom, store);
    res.status(200).type("text/html").send(html);
});

app.listen(3000, () => {
    console.log("server started");
});
