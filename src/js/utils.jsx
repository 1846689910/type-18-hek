import Big from "big.js";
const Double = {
   "MIN_VALUE": Big("-1.7976931348623157E308"),
   "MAX_VALUE": Big("1.7976931348623157E308")
};
const Long = {
   "MIN_VALUE": Big(-2).pow(63),
   "MAX_VALUE": Big(2).pow(63).minus(1)
};
class ActionWatcher {
    constructor(onAction, afterAction, timeout) {
        this._timer = null;
        this._timeout = timeout;
        this._onAction = typeof onAction === "function" ? onAction : null;
        this._afterAction = typeof afterAction === "function" ? afterAction : null;
        this._event = null;
    }
    watch = e => {
        this._event = e;
        if (e.persist) e.persist();
        if (this._onAction) {
            this._onAction(this._event);
        }
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        this._timer = setTimeout(() => {
            if (this._afterAction) {
                this._afterAction(this._event);
                this._event = null;
            }
        }, this._timeout);
    };
}
export {Double, Long, ActionWatcher};