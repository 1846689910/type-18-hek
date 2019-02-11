/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import configureStore from "./settings/store";
import {Provider} from "react-redux";
import {routes} from "./settings/routes";
import {renderRoutes} from "react-router-config";
import M from "../js/components/Messenger";
import "../css/main.css";
// ReactDOM.render(<Main />, document.querySelector("#root"));
// const render = () => ReactDOM.render(
//     <Router>
//         <Switch>
//             <Route path="/redux"><ReduxConcise store={store}/></Route>
//             <Route path="/react-redux">
//                 <Provider store={store}><ReactReduxConcise/></Provider>
//             </Route>
//             <Route path="/reselect">
//                 <Provider store={store}><ReselectConcise/></Provider>
//             </Route>
//             <Route path="/mobx" component={MobXConcise}/>
//             <Route path="/" component={Main}/>
//         </Switch>
//     </Router>,document.querySelector("#root")
// );
const store = configureStore(window.__PRELOADED_STATE__);
M.store = store;
const App = () => renderRoutes(routes);
const render = App => ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.querySelector("#root")
);
render(App);
store.subscribe(() => render(App));
if (module.hot){ // 开启HMR(Hot Module Replacement)
    module.hot.accept();
    module.hot.accept("./settings/routes", () => {
        const r = require("./settings/routes");
        render(() => renderRoutes(r.routes));
    });
}
