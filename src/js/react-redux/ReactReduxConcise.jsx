import React from "react";
import {connect} from "react-redux";
import {increase, decrease, fetchData} from "../settings/actions";
import {Link} from "react-router-dom";

/**
 * Counter is a presentational component(pc)
 * pc (for UI only, no state mgmt, all data from props, no redux api)
 * */
const CounterPC = (props) => {
    const {dispatch, value} = props;
    return (
        <div>
            <p style={{textAlign: "center"}}><b><i>React-Redux Display</i></b></p>
            <div style={{padding: 0}}>
                <h3 style={{textAlign: "center"}}>{value}</h3>
                <div style={{textAlign: "center"}}>
                    <button className="btn btn-success" onClick={() => dispatch(increase())}>increase</button>
                    <button className="btn btn-danger" onClick={() => dispatch(decrease())}>decrease</button>
                    <Link to="/"><button className="btn btn-primary">to /</button></Link>
                </div>
            </div>
        </div>
    );
};
const MessengerPC = ({dispatch, message}) => (<div style={{textAlign: "center"}}>
    <input type="text" disabled value={message}/>
    <button className="btn btn-primary" onClick={() => dispatch(fetchData())}>fetch</button>
</div>); 
/**
 * mapStateToProps: 建立state到内部pc组件的联系，使得内部PC组件可以拿到更新的state和props
 * */
const mapStateToProps = (state, props) => {
    const {value, message} = state;
    return {
        value,  // 连接CounterPC的属性value到state的value属性
        message,
    };
};

/**
 * mapDispatchToProps: 建立dispatch方法到props的连接，使得内部PC组件可以向外发送
 * 写法1(推荐)：作为函数 => 返回对象，每个键值对都会返回一个函数，内部发送Action
 * */
const mapDispatchToProps1 = (dispatch, props) => {
    return {
        increase: () => dispatch(increase()),
        decrease: () => dispatch(decrease()),
        fetchData: () => dispatch(fetchData())
    };
};
/**
 * 写法2：作为object, 每个键值对都会返回一个函数，内部返回一个Action
 * */
const mapDispatchToProps2 = {
    increase: () => increase(),
    decrease: () => decrease(),
    fetchData: () => fetchData()
};
/** 
 * 写法3： 基本同写法1，更简化(推荐).但是发送事件需要具体实现，如dispath(Action(ActionType.INCREASE))
 */
const mapDispatchToProps3 = (dispatch, props) => ({ dispatch });
/**
 * CounterCC is CounterPC's container component(cc)
 * cc (manage state and logic, no UI, use redux api)
 * 如果CounterCC没有传入mapStateToProps和mapDispatchToProps的话，那么内部的PC组件不会及时地刷新UI
 * */
const CounterCC = connect(
    mapStateToProps,
    (dispatch, props) => ({ dispatch })  // 使用了写法3
)(CounterPC);

const Messenger = connect(
    mapStateToProps,
    (dispatch, props) => ({dispatch}) 
)(MessengerPC);

const ReactReduxConcise = props => {
    console.log(props.route);
    return (
        <div>
            <CounterCC/>
            <hr/>
            <Messenger/>
        </div>
    );
};

export default ReactReduxConcise;
