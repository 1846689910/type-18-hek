/**
 * Created by Eric on 9/6/2018.
 */
/* eslint-disable no-unused-vars, no-undef */
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import configureStore from "./settings/store";
import {Provider} from "react-redux";
import {routes} from "./settings/routes";
import {renderRoutes} from "react-router-config";
import M from "../js/components/Messenger";

const store = configureStore(window.__PRELOADED_STATE__);
M.store = store;
const App = () => renderRoutes(routes);
const reactStart = module.hot ? ReactDOM.hydrate : ReactDOM.render;
const render = App => reactStart(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.querySelector("#root")
);
render(App);
store.subscribe(() => render(App));
if (module.hot){ // 开启HMR(Hot Module Replacement)
    module.hot.accept("./settings/routes", () => {
        const r = require("./settings/routes");
        render(() => renderRoutes(r.routes));
    });
}
