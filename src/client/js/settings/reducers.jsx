/* eslint-disable no-unused-vars */
import { combineReducers } from "redux";
import { ActionTypes } from "./actions";

/**
 * 一个APP只有一个store, 管理一个state
 * 每个state属性要有相应的handler并且要传入reducer, 然后react-redux才可以看到该state的属性
 * */
export const initialState = {
  counter: { value: 0 }
};

const counter = (counter = initialState.counter, action) => {
  switch (action.type) {
    case ActionTypes.INCREASE:
      counter.value++;
      break;
    case ActionTypes.DECREASE:
      counter.value--;
      break;
  }
  return { ...counter };
};

/**
 * reducer写法3
 * use combineReducers
 * 默认地initialState是空{}, 函数名就是state的属性名
 * */
export default combineReducers({
  counter
});
