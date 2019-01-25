import React from 'react';
import {createSelector} from  'reselect';
import { connect } from "react-redux";
import { showAll, showActive, showCompleted, ActionTypes, fetchData } from '../settings/actions';
import {Link} from "react-router-dom";

/**
 * reselect的作用
 *
 1. Selectors can compute derived data, allowing Redux to store the minimal possible state.
 2. Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
 3. Selectors are composable. They can be used as input to other selectors.
 * */
const getVisibleTasks = state => {  // 根据sotre中的state.filterText的变化来决定我们要看的tasks的子集
    switch(state.filterText){
        case ActionTypes.SHOW_ALL:
            return state.tasks;
        case ActionTypes.SHOW_COMPLETED:
            return state.tasks.filter(task => task.status === "completed");
        case ActionTypes.SHOW_ACTIVE:
            return state.tasks.filter(task => task.status === "active");
    }
};
const getMessage = state => state.message;
/**
 * 对于这个VisibleTasks, 他所需要的属性tasks, 是来源于APP的state中的state.tasks和state.filterText算出来的。他自己只负责渲染这个
 * tasks的计算结果
 * reselect 就要对这个tasks作memorize
 * */
  // 写法1: 数组作为参数
const selector1 = () => createSelector([
    (state, props) => state
], getVisibleTasks);  // 这个getVisibleTasks的函数的参数顺序要和数组一样，其实就是把数组的参数传了进去
  // 写法2:不写成数组也可以, 但是建议使用写法1
const selector2 = () => createSelector(
    (state, props) => state,
    getVisibleTasks
);
const messageSelector = () => createSelector([
    (state, props) => state,
], getMessage);
/**
 * the presentational component of VisibleTasks
 * */
const VisibleTasksPC = props => {
    return (<div>
        <p style={{textAlign: "center"}}><b><i>Reselect Display(combined with React-Redux)</i></b></p>
        <p>tasks: </p>
        <ul>{
            props.tasks.map((task, i) => <li key={i}>{task.name}: {task.status}</li>)
        }</ul>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <button className="btn btn-primary" onClick={props.showAll}>All</button>
            <button className="btn btn-primary" onClick={props.showCompleted}>Completed</button>
            <button className="btn btn-primary" onClick={props.showActive}>Active</button>
            <Link to="/"><button className="btn btn-primary">to /</button></Link>
        </div>
    </div>);
};
const MessengerPC = ({dispatch, message}) => (<div style={{textAlign: "center"}}>
    <input type="text" disabled value={message}/>
    <button className="btn btn-primary" onClick={() => dispatch(fetchData())}>fetch</button>
</div>);
/**
 * Reselect 的用法1:
 * 在mapStateToProps中直接使用  myState: getMyState(state.aaa, state.bbb, ...)
 * 但是问题是: 如果我的PC渲染层组件有重复多个,比如
     <VisibleTodoList listId="1" />
     <VisibleTodoList listId="2" />
     <VisibleTodoList listId="3" />
 那么reselect就不能有效地记忆状态，还是会每次重新计算新的状态，使得效率降低
 原因:
    reselect的selector的cache size是1，每次输入值相同时会返回cache的状态而不会再次计算。但是我们现在有3个组件，要渲染他们时
 需要传入listId=1然后2，然后3，那么reselect就不得不每次重复计算

 解决:
    使用方法2：将mapStateToProps再包裹一层函数，使得构造每个容器层组件实例的connect方法都会用不同的mapStateToProps,这样就相当于每个实例
 都会自己保存自己的listId, 不会只有一个listId
 * */
const mapStateToProps1 = (state, props) => ({
    tasks: getVisibleTasks(state),
    message: getMessage(state)
});
/**
 * Reselect 的用法2:
 * 将mapStateToProps再包裹一层，并使用selector. 在connect中传入mapStateToPropsBuilder
 * */
const mapStateToProps2 = () => ((state, props) => ({
    tasks: selector1()(state, props)  // 区别于getVisibleTasks方法，我们传入的state, props来生成getVisibleTasks方法
}));
const mapStateToProps2_1 = () => ((state, props) => ({
    message: messageSelector()(state, props)
}))

const mapDispatchToProps = (dispatch, props) => ({
    showAll: () => dispatch(showAll()),
    showCompleted: () => dispatch(showCompleted()),
    showActive: () =>  dispatch(showActive())
});
const mapDispatchToProps2 = (dispatch, props) => ({ dispatch }); // 这样props里只能使用dispatch
/**
 * VisibleTasks is the Container Component of VisibleTasksPC
 * 建议使用方法2，对于mapStateToProps进行了包裹
 * */
//const VisibleTasks = connect(mapStateToProps, mapDispatchToProps)(VisibleTasksPC);
const VisibleTasksCC = connect(
    mapStateToProps2,
    mapDispatchToProps
)(VisibleTasksPC);
const Messenger = connect(
    mapStateToProps2_1,
    (dispatch, props) => ({dispatch})
)(MessengerPC);

const ReselectConcise = props => {
    return (<div>
        <VisibleTasksCC/>
        <hr/>
        <Messenger/>
    </div>)
};
export default ReselectConcise;