import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";

/**
 * Redux Thunk middleware allows you to write action creators that return a function
 * instead of an action. The thunk can be used to delay the dispatch of an action,
 * or to dispatch only if a certain condition is met. The inner function receives
 * the store methods `dispatch` and `getState` as parameters.
 */
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStore = (initialState?) => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, logger),
  );
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};
