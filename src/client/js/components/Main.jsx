import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Window } from "./Window";
import { app } from "./Container";
import M from "./Messenger";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";  // eslint-disable-line
import {People} from "./People.ts";
console.log(People);
/**
 * .babelrc.js, webpack.config.js, src/server/index.js
 * @babel/preset-typescript, @babel/plugin-transform-typescript
 * parse typescript error
 */

const StatelessComp = props => {  // eslint-disable-line
    return <div />;
};
class StatedComp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div />;
    }
}
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static get defaultProps() {
        return {};
    }
    componentDidMount() {
        console.log(this._windowComp.div);
        console.log(this._windowComp.setState());
        app.add(11, { a: 123 }, { p: 123, q: 456 });
        app.add(12, { b: 456 }, { p: 456 });
        app.updatePropsByK(11, { p: 456 });
        console.log(app.getVsByProps({ p: 456 }));
    }
    render() {
        console.log(M.custom);
        return (
            <div>
                <Window ref={r => (this["_windowComp"] = r)} />
                <StatelessComp />
                <StatedComp ref={r => (this["_statedComp"] = r)} />
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Link to="/redux">
                        <button styleName="bootstrap.btn bootstrap.btn-primary">to /redux</button>
                    </Link>
                    <Link to="/react-redux">
                        <button styleName="bootstrap.btn bootstrap.btn-primary">to /react-redux</button>
                    </Link>
                    <Link to="/reselect">
                        <button styleName="bootstrap.btn bootstrap.btn-primary">to /reselect</button>
                    </Link>
                    <Link to="/mobx">
                        <button styleName="bootstrap.btn bootstrap.btn-primary">to /mobx</button>
                    </Link>
                </div>
            </div>
        );
    }
}
export { StatedComp, StatelessComp };
