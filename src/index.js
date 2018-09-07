/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Window} from "./js/Window";
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <Window/>
            </div>
        );
    }
}
ReactDOM.render(<Main />, document.querySelector("#root"));