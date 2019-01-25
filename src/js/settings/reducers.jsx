import { combineReducers } from "redux";
import { ActionTypes, Action } from "./actions";
/**
 * 一个APP只有一个store, 管理一个state
 * 每个state属性要有相应的handler并且要传入reducer, 然后react-redux才可以看到该state的属性
 * */
const initialState = {
    value: 0,
    value2: 0,
    tasks: [
        { name: "task1", status: "completed" },
        { name: "task2", status: "active" },
        { name: "task3", status: "active" },
        { name: "task4", status: "completed" }
    ],
    filterText: ActionTypes.SHOW_ALL, // "SHOW_COMPLETED", "SHOW_ACTIVE"
    message: ""
};
const valueHandler = (value = initialState.value, action) => {
    switch (action.type) {
        case ActionTypes.INCREASE:
            value += 1;
            break;
        case ActionTypes.DECREASE:
            value -= 1;
            break;
    }
    return value;
};
const value2Handler = (value2 = initialState.value2, action) => {
    return value2;
};
const filterTextHandler = (filterText = initialState.filterText, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_ALL:
            filterText = ActionTypes.SHOW_ALL;
            break;
        case ActionTypes.SHOW_COMPLETED:
            filterText = ActionTypes.SHOW_COMPLETED;
            break;
        case ActionTypes.SHOW_ACTIVE:
            filterText = ActionTypes.SHOW_ACTIVE;
            break;
    }
    return filterText;
};
const tasksHandler = (tasks = initialState.tasks, action) => {
    return tasks;
};
const message = (message = initialState.message, action) => {
    switch(action.type) {
        case ActionTypes.CLEAR_FIELD:
            message = "";
            break;
        case ActionTypes.DATA_FETCH_RECEIVED:
            message = action.message;
            break;
        case ActionTypes.DATA_FETCH_FAILED:
            message = action.err.message;
            break;
    }
    return message;
}
/**
 * Reducer所接收的函数都是纯函数pure function, 一个input 对应一个确定的返回值
 * 	    1 不能修改参数
 *      2 不能调用系统的I/O的API
 *      3 不能调用Date.now()或Math.random()这种方法，因为每次得到的结果会不一样
 *
 * reducer写法1
 *  单一的reducer
 * 有initialState, reducer接收两个参数state = initialState和action对象
 * */
export const reducer1 = (state = initialState, action) => {
    state.value = valueHandler(state.value, action);
    state.value2 = value2Handler(state.value2, action);
    state.filterText = filterTextHandler(state.filterText, action);
    state.tasks = tasksHandler(state.tasks, action);
    state.message = message(state.message, action);
    return { ...state };
};

/**
 * reducer写法2, 其实和写法1是一样的，只不过把value和value2都放到新的object里
 * */
export const reducer2 = (state = initialState, action) => {
    return {
        value: valueHandler(state.value, action),
        value2: (function(value2, action) {
            // 用闭包的形式写也可以
            return value2;
        })(state.value2, action),
        filterText: filterTextHandler(state.filterText, action),
        tasks: tasksHandler(state.tasks, action),
        message: message(state.message, action)
    };
};

/**
 * reducer写法3
 * use combineReducers
 * 默认地initialState是空{}, 函数名就是state的属性名
 * */
export const reducer3 = combineReducers({
    value: valueHandler, // 如果valueHandler的名字为value和state.value属性的名字一样，就可以只写{value, value2}
    value2: value2Handler,
    filterText: filterTextHandler,
    tasks: tasksHandler,
    message
});
