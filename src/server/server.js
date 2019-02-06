import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import getTemplate from "../../template/template";
import {Provider} from "react-redux";
import {routes} from "../client/js/settings/routes";
import store from "../client/js/settings/store";
import {StaticRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import fs from "fs";


const app = express();
const staticPath = path.resolve( __dirname, "../../dist" );
let template;
app.use(express.static(staticPath));
app.get("/*", (req, res) => {
    const App = () => renderRoutes(routes);
    const reactDom = renderToString(<Provider store={store}>
        <StaticRouter context={{}} location={ req.url }>
            <App/>
        </StaticRouter>
    </Provider>);
    const html = getTemplate1(staticPath, reactDom, store); // getTemplate( reactDom, store.getState() )
    res.status(200).type("text/html").send(html);
});

app.listen(3000);
function getTemplate1(staticPath, reactDom, store){
    if (! template) {
        template = fs.readFileSync(path.join(staticPath, "main.html"), {encoding: "utf-8"});
    }
    return template
        .replace("<!-- __PRELOADED_STATE__ -->", `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>`)
        .replace("<!-- __REACT_DOM__ -->", reactDom);
}
