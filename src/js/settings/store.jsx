import { createStore } from "redux";
import { reducer3 } from "./reducers";
/**
 * the unique store accepts one reducer of above
 * */
export default createStore(reducer3);
