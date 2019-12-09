export const ActionTypes = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE"
};
export const increase = (attr = {}) => ({
  ...attr,
  type: ActionTypes.INCREASE
});
export const decrease = (attr = {}) => ({
  ...attr,
  type: ActionTypes.DECREASE
});
