/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { increase, decrease, fetchData } from "../settings/actions";
import { Link } from "react-router-dom";
import M from "../components/Messenger";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

const Counter = props => {
  const divStyle = {
    padding: 0
  };
  const { store } = props;
  return (
    <div>
      <p style={{ textAlign: "center" }}>
        <b>
          <i>pure Redux Display</i>
        </b>
      </p>
      <div style={divStyle}>
        <h3 style={{ textAlign: "center" }}>{store.getState().value}</h3>
        <div style={{ textAlign: "center" }}>
          <button styleName="bootstrap.btn bootstrap.btn-success" onClick={() => store.dispatch(increase())}>
            increase
          </button>
          <button styleName="bootstrap.btn bootstrap.btn-danger" onClick={() => store.dispatch(decrease())}>
            decrease
          </button>
          <Link to="/">
            <button styleName="bootstrap.btn bootstrap.btn-primary">to /</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
Counter.propTypes = {
  store: PropTypes.object
};
const Messenger = ({ store }) => (
  <div style={{ textAlign: "center" }}>
    <input type="text" disabled value={store.getState().message} />
    <button styleName="bootstrap.btn bootstrap.btn-primary" onClick={() => store.dispatch(fetchData())}>
      fetch
    </button>
  </div>
);
Messenger.propTypes = {
  store: PropTypes.object
};
export default class ReduxConcise extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.route);
  }
  render() {
    const { store } = M;
    return (
      <div>
        <Counter store={store} />
        <hr />
        <Messenger store={store} />
      </div>
    );
  }
}
ReduxConcise.propTypes = {
  route: PropTypes.object
};
