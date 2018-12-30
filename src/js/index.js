/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import "../../node_modules/leaflet/dist/leaflet.css";
import "../../node_modules/leaflet/dist/images/marker-icon.png";
import "../../node_modules/leaflet/dist/images/marker-icon-2x.png";
import "../../node_modules/leaflet/dist/images/marker-shadow.png";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../node_modules/leaflet-measure/scss/leaflet-measure.scss";
import "leaflet";
import "leaflet-measure";
import {Window} from "./Window";
import {app} from "./Container";
import "../css/main.css";
import $ from "jquery";
import "../../node_modules/jquery-ui-dist/jquery-ui.min.css";
import "../../node_modules/jquery-ui-dist/jquery-ui.structure.min.css";
import "../../node_modules/jquery-ui-dist/jquery-ui.theme.min.css";
import "../../node_modules/jquery-ui-dist/jquery-ui.min";
import "../../node_modules/jquery-ui-dist/jquery-ui.structure.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min";
import {People} from "./People.ts";
import store from "./Store";
import ReduxConcise from "./redux/ReduxConcise";
import ReactReduxConcise from "./react-redux/ReactReduxConcise";
import ReselectConcise from "./reselect/ReselectConcise";
import MobXConcise from "./mobx/MobXConcise";
import {Provider} from "react-redux";


console.log(People);
const StatelessComp = props => {
    return (<div></div>);
};
class StatedComp extends React.Component{
    constructor(props){super(props)}
    render(){
        return (<div></div>);
    }
}
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    static get defaultProps(){
        return {};
    }
    componentDidMount(){
        console.log(this._windowComp.div);
        console.log(this._windowComp.setState());
        app.add(11, {a: 123}, {p: 123, q: 456});
        app.add(12, {b: 456}, {p: 456});
        app.updatePropsByK(11, {p: 456});
        console.log(app.getVsByProps({p: 456}));
    }
    render(){
        return (
            <div>
                <Window ref={r => this[`_windowComp`] = r}/>
                <StatelessComp/>
                <StatedComp ref={r => this[`_statedComp`] = r}/>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <Link to="/redux"><button className="btn btn-primary">to /redux</button></Link>
                    <Link to="/react-redux"><button className="btn btn-primary">to /react-redux</button></Link>
                    <Link to="/reselect"><button className="btn btn-primary">to /reselect</button></Link>
                    <Link to="/mobx"><button className="btn btn-primary">to /mobx</button></Link>
                </div>
            </div>
        );
    }
}
// ReactDOM.render(<Main />, document.querySelector("#root"));
const render = () => ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/redux"><ReduxConcise store={store}/></Route>
            <Route path="/react-redux">
                <Provider store={store}><ReactReduxConcise/></Provider>
            </Route>
            <Route path="/reselect">
                <Provider store={store}><ReselectConcise/></Provider>
            </Route>
            <Route path="/mobx" component={MobXConcise}/>
            <Route path="/" component={Main}/>
        </Switch>
    </Router>,document.querySelector("#root")
);
render();
store.subscribe(render);