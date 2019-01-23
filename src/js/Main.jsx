import React from "react";
import {Link} from "react-router-dom";
import {Window} from "./Window";
import {app} from "./Container";
import {People} from "./People";

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
export default class Main extends React.Component{
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
export {StatedComp, StatelessComp};