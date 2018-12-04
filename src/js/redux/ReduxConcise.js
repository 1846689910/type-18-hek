import React from "react";
import {ActionTypes, Action} from "../Store";
import {Link} from "react-router-dom";

const Counter = (props) => {
    const divStyle = {
        padding: 0,
    };
    return (
        <div>
            <p style={{textAlign: "center"}}><b><i>pure Redux Display</i></b></p>
            <div style={divStyle}>
                <h3 style={{textAlign: "center"}}>{props.store.getState().value}</h3>
                <div style={{textAlign: "center"}}>
                    <button className="btn btn-success" onClick={() => props.store.dispatch(Action(ActionTypes.INCREASE))}>increase</button>
                    <button className="btn btn-danger" onClick={() => props.store.dispatch(Action(ActionTypes.DECREASE))}>decrease</button>
                    <Link to="/"><button className="btn btn-primary">to /</button></Link>
                </div>
            </div>
        </div>
    );
};
export default class ReduxConcise extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Counter store={this.props.store}/>
            </div>
        );
    }
}