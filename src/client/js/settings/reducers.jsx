/* eslint-disable no-unused-vars */
import { combineReducers } from "redux";
import { ActionTypes } from "./actions";

/**
 * one app maintain sinle centralized state
 * */
export const initialState = {
  counter: { value: 0 },
  selectOptions: {
    value: []
  },
  selectedOption: {
    value: []
  }
};

const counter = (counter = initialState.counter, action) => {
  if (action.type === ActionTypes.SET_COUNTER_ACTION) {
    counter.value = action.data;
  }
  return { ...counter };
};

const selectOptions = (selectOptions = initialState.selectOptions, action) => {
  if (action.type === ActionTypes.SET_SELECT_OPTIONS_ACTION) {
    selectOptions.value = action.data;
  }
  return { ...selectOptions };
};

const selectedOption = (
  selectedOption = initialState.selectedOption,
  action
) => {
  if (action.type === ActionTypes.SET_SELECTED_OPTION_ACTION) {
    selectedOption.value = action.data;
  }
  return { ...selectedOption };
};

/**
 * reducer
 * use combineReducers
 * initialState is empty object by default, function name is state field
 * */
export default combineReducers({
  counter,
  selectOptions,
  selectedOption
});
