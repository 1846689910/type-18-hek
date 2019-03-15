import React from "react";
import { connect } from "react-redux";
import { setShowFakeComp } from "../settings/actions";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css"; // eslint-disable-line
import Promise from "bluebird";

let Fake;
const loadFakeComp = (dispatch, doRefresh = false) => {
  if (!Fake || doRefresh) {
    const ready = doRefresh
      ? Promise.try(() => dispatch(setShowFakeComp({ value: false }))).delay(1000)
      : Promise.try(() => {});
    ready
      .then(() => import("./demo-fake"))
      .catch(console.log)
      .then(({ Fake: _Fake }) => {
        Fake = _Fake;
        dispatch(setShowFakeComp({ value: true }));
      });
  }
};

const _DynamicImportDemo = props => {
  const { showFakeComp, dispatch } = props;
  loadFakeComp(dispatch);
  return (
    <div>
      <h6>Dynamic Import</h6>
      {showFakeComp && Fake ? <Fake {...props} /> : <div>Fake Comp is loading ...</div>}
      <button
        styleName={"bootstrap.btn bootstrap.btn-primary"}
        onClick={() => loadFakeComp(dispatch, true)}
      >
        Refresh Fake Comp
      </button>
    </div>
  );
};

export default connect(
  state => state,
  dispatch => ({ dispatch })
)(_DynamicImportDemo);

// if (module.hot) {
//   module.hot.accept(); // TODO: HMR with Dynamic Import
// }
