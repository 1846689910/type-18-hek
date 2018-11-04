export class ActionWatcher{
    constructor(onAction, afterAction, timeout){
        this._timer = null;
        this._timeout = timeout;
        this._onAction = typeof onAction === "function" ? onAction : null;
        this._afterAction = typeof afterAction === "function" ? afterAction : null;
    }
    watch = (e) => {
        if (this._onAction) this._onAction(e);
        if (this._timer){
            clearTimeout(this._timer);
            this._timer = null;
        }
        const eTarget = e.target;
        this._timer = setTimeout(() => {
            if (this._afterAction) this._afterAction(eTarget);
        }, this._timeout);
    };
}
