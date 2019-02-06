export const ActionTypes = {
    INCREASE: "INCREASE",
    DECREASE: "DECREASE",
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE",
    DATA_FETCH_RECEIVED: "DATA_FETCH_RECEIVED",
    DATA_FETCH_FAILED: "DATA_FETCH_FAILED",
    CLEAR_FIELD: "CLEAR_FIELD"
};
/** 一个自定义的ActionBuilder */
export const Action = (type, attr) => ({ ...attr, type });

export const increase = (attr = {}) => Action(ActionTypes.INCREASE, attr);
export const decrease = (attr = {}) => Action(ActionTypes.DECREASE, attr);
export const showAll = (attr = {}) => Action(ActionTypes.SHOW_ALL, attr);
export const showCompleted = (attr = {}) => Action(ActionTypes.SHOW_COMPLETED, attr);
export const showActive = (attr = {}) => Action(ActionTypes.SHOW_ACTIVE, attr);
export const dataFetchReceived = (attr = {}) => Action(ActionTypes.DATA_FETCH_RECEIVED, attr);
export const dataFetchFailed = (attr = {}) => Action(ActionTypes.DATA_FETCH_FAILED, attr);
export const clearField = (attr = {}) => Action(ActionTypes.CLEAR_FIELD, attr);
// fetchData is an action creator which returns function instead of an action
export const fetchData = () => async (dispatch, getState) => {
    dispatch(clearField());
    await new Promise(resolve => {
        setTimeout(resolve, 2000, { message: "Hello World" });
    })
        .then(({message}) => dispatch(dataFetchReceived({ message })))
        .catch(err => dispatch(dataFetchFailed({ err })));
};
