/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "../images/favicon.ico";
import store from "./settings/store";
import {Provider} from "react-redux";
import {routes} from "./settings/routes";
import {renderRoutes} from "react-router-config";
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
const App = () => renderRoutes(routes);
const render = App => ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,document.querySelector("#root")
);
render(App);
store.subscribe(() => render(App));
if (module.hot){ // 开启HMR(Hot Module Replacement)
    module.hot.accept();
}