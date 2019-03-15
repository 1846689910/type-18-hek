/* eslint-disable new-cap */
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
export const increase = (attr = {}) => ({
  ...attr,
  type: ActionTypes.INCREASE
});
export const decrease = (attr = {}) => ({
  ...attr,
  type: ActionTypes.DECREASE
});
export const showAll = (attr = {}) => ({
  ...attr,
  type: ActionTypes.SHOW_ALL
});
export const showCompleted = (attr = {}) => ({
  ...attr,
  type: ActionTypes.SHOW_COMPLETED
});
export const showActive = (attr = {}) => ({
  ...attr,
  type: ActionTypes.SHOW_ACTIVE
});
export const dataFetchReceived = (value, attr = {}) => ({
  ...attr,
  value,
  type: ActionTypes.DATA_FETCH_RECEIVED
});
export const dataFetchFailed = (value, attr = {}) => ({
  ...attr,
  value,
  type: ActionTypes.DATA_FETCH_FAILED
});
export const clearField = (attr = {}) => ({
  ...attr,
  type: ActionTypes.CLEAR_FIELD
});
// fetchData is an action creator which returns function instead of an action
export const fetchData = () => async (dispatch, getState) => {
  dispatch(clearField());
  await new Promise(resolve => {
    setTimeout(resolve, 2000, { message: "Hello World" });
  })
    .then(({ message }) => dispatch(dataFetchReceived(message)))
    .catch(err => dispatch(dataFetchFailed(err)));
};
