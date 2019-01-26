/**
 * self-define redux middleware
 * redux middleware: 三层函数嵌套store --> next --> action
 */
const logger = store => next => action => {
    const {dispatch, getState} = store;
    console.log(`will dispatch ${action}`);
    let ret;
    if (typeof action === "function") {
        res = action(dispatch, getState);
    } else {
        ret = next(action);
    }
    console.log(`updated state ${getState()}`);
    return ret;
};
export default logger;