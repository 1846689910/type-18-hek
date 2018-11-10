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
import "./main.css";
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        console.log(this._windowComp.div);
        console.log(this._windowComp.setState());
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