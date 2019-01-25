import { createStore, applyMiddleware } from "redux";
import { reducer3 } from "./reducers";
/**
 * Redux Thunk middleware allows you to write action creators that return a function 
 * instead of an action. The thunk can be used to delay the dispatch of an action, 
 * or to dispatch only if a certain condition is met. The inner function receives 
 * the store methods `dispatch` and `getState` as parameters.
 */
import thunk from "redux-thunk";
/**
 * the unique store accepts one reducer of above
 * */
export default createStore(reducer3, applyMiddleware(thunk));
