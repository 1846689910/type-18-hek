/* eslint-disable no-unused-vars */
import { combineReducers } from "redux";
import { ActionTypes } from "./actions";
/**
 * 一个APP只有一个store, 管理一个state
 * 每个state属性要有相应的handler并且要传入reducer, 然后react-redux才可以看到该state的属性
 * */
export const initialState = {
  counter: { value: 0 },
  value2: { value: 0 },
  tasks: {
    value: [
      { name: "task1", status: "completed" },
      { name: "task2", status: "active" },
      { name: "task3", status: "active" },
      { name: "task4", status: "completed" }
    ]
  },
  filterText: { value: ActionTypes.SHOW_ALL }, // "SHOW_COMPLETED", "SHOW_ACTIVE"
  message: { value: "" }
};
const counter = (counter = initialState.counter, action) => {
  switch (action.type) {
    case ActionTypes.INCREASE:
      counter.value += 1;
      break;
    case ActionTypes.DECREASE:
      counter.value -= 1;
      break;
  }
  return {...counter};
};
const value2 = (value2 = initialState.value2, action) => ({ ...value2 });
const tasks = (tasks = initialState.tasks, actions) => ({ ...tasks });
const filterText = (filterText = initialState.filterText, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ALL:
      filterText.value = ActionTypes.SHOW_ALL;
      break;
    case ActionTypes.SHOW_COMPLETED:
      filterText.value = ActionTypes.SHOW_COMPLETED;
      break;
    case ActionTypes.SHOW_ACTIVE:
      filterText.value = ActionTypes.SHOW_ACTIVE;
      break;
  }
  return {...filterText};
};
const message = (message = initialState.message, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_FIELD:
      message.value = "";
      break;
    case ActionTypes.DATA_FETCH_RECEIVED:
      message.value = action.value;
      break;
    case ActionTypes.DATA_FETCH_FAILED:
      message.value = action.value;
      break;
  }
  return {...message};
};
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
  state.counter = counter(state.counter, action);
  state.value2 = value2(state.value2, action);
  state.filterText = filterText(state.filterText, action);
  state.tasks = tasks(state.tasks, action);
  state.message = message(state.message, action);
  return { ...state };
};

/**
 * reducer写法2, 其实和写法1是一样的，只不过把counter和value2都放到新的object里
 * */
export const reducer2 = (state = initialState, action) => {
  return {
    counter: counter(state.counter, action),
    value2: ((value2, action) => value2)(state.value2, action), // 用闭包的形式
    filterText: filterText(state.filterText, action),
    tasks: tasks(state.tasks, action),
    message: message(state.message, action)
  };
};

/**
 * reducer写法3
 * use combineReducers
 * 默认地initialState是空{}, 函数名就是state的属性名
 * */
export const reducer3 = combineReducers({
  counter,
  value2,
  filterText,
  tasks,
  message
});
