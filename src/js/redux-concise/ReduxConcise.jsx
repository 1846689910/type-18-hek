import React from "react";
import {increase, decrease, fetchData} from "../settings/actions";
import {Link} from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

const Counter = (props) => {
    const divStyle = {
        padding: 0,
    };
    const {store} = props;
    return (
        <div>
            <p style={{textAlign: "center"}}><b><i>pure Redux Display</i></b></p>
            <div style={divStyle}>
                <h3 style={{textAlign: "center"}}>{store.getState().value}</h3>
                <div style={{textAlign: "center"}}>
                    <button styleName="bootstrap.btn bootstrap.btn-success" onClick={() => store.dispatch(increase())}>increase</button>
                    <button styleName="bootstrap.btn bootstrap.btn-danger" onClick={() => store.dispatch(decrease())}>decrease</button>
                    <Link to="/"><button styleName="bootstrap.btn bootstrap.btn-primary">to /</button></Link>
                </div>
            </div>
        </div>
    );
};
const Messenger = ({store}) => (<div style={{textAlign: "center"}}>
    <input type="text" disabled value={store.getState().message}/>
    <button styleName="bootstrap.btn bootstrap.btn-primary" onClick={() => store.dispatch(fetchData())}>fetch</button>
</div>);
export default class ReduxConcise extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props);
        console.log(this.props.route);
    }
    render() {
        const {store} = this.props.route;
        return (
            <div>
                <Counter store={store}/>
                <hr/>
                <Messenger store={store}/>
            </div>
        );
    }
}