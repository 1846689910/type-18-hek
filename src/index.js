/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/leaflet/dist/images/marker-icon.png";
import "../node_modules/leaflet/dist/images/marker-icon-2x.png";
import "../node_modules/leaflet/dist/images/marker-shadow.png";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/leaflet-measure/scss/leaflet-measure.scss";
import "leaflet";
import "leaflet-measure";
import {Window} from "./js/Window";
import {app} from "./js/Container";
import "./main.css";
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
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
            </div>
        );
    }
}
ReactDOM.render(<Main />, document.querySelector("#root"));