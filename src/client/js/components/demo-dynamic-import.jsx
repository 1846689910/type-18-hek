import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setShowFakeComp } from "../settings/actions";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css"; // eslint-disable-line
import Promise from "bluebird";

let Fake;
const loadFakeComp = (dispatch, doRefresh = false) => {
  if (!Fake || doRefresh) {
    const ready = doRefresh
      ? Promise.try(() => dispatch(setShowFakeComp(false))).delay(1000)
      : Promise.try(() => {});
    ready
      .then(() => import("./demo-fake"))
      .then(({ Fake: _Fake }) => {
        Fake = _Fake;
        dispatch(setShowFakeComp(true));
      });
  }
};

const DynamicImportDemo = props => {
  const { showFakeComp, dispatch } = props;
  loadFakeComp(dispatch);
  return (
    <div>
      <h6>Dynamic Import</h6>
      {showFakeComp.value && Fake ? <Fake {...props} /> : <div>Fake Comp is loading ...</div>}
      <button
        styleName={"bootstrap.btn bootstrap.btn-primary"}
        onClick={() => loadFakeComp(dispatch, true)}
      >
        Refresh Fake Comp
      </button>
    </div>
  );
};
DynamicImportDemo.propTypes = {
  showFakeComp: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(
  state => state,
  dispatch => ({ dispatch })
)(DynamicImportDemo);

// if (module.hot) {
//   module.hot.accept(); // TODO: HMR with Dynamic Import
// }
