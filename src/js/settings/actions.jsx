export const ActionTypes = {
    INCREASE: "INCREASE",
    DECREASE: "DECREASE",
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE"
};
/** 一个自定义的ActionBuilder */
export const Action = (type, attr) => ({ ...attr, type });

export const increase = (attr = {}) => Action(ActionTypes.INCREASE, attr);
export const decrease = (attr = {}) => Action(ActionTypes.DECREASE, attr);
export const showAll = (attr = {}) => Action(ActionTypes.SHOW_ALL, attr);
export const showCompleted = (attr = {}) => Action(ActionTypes.SHOW_COMPLETED, attr);
export const showActive = (attr = {}) => Action(ActionTypes.SHOW_ACTIVE, attr);
