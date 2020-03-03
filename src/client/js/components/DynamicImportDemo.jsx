import React from "react";
import loadable from "@loadable/component";
import { Typography } from "@material-ui/core";

const ReactSelectDemo = loadable(
  {
    chunkName() {
      return "ReactSelectDemo";
    },
    isReady(props) {
      if (typeof __webpack_modules__ !== "undefined") {
        return !!__webpack_modules__[this.resolve(props)]; // eslint-disable-line
      }
      return false;
    },
    requireAsync: () =>
      import(
        /* webpackChunkName: "ReactSelectDemo" */ "./ReactSelectDemo"
      ).then(({ ReactSelectDemo }) => ReactSelectDemo),
    requireSync(props) {
      const id = this.resolve(props);
      if (typeof __webpack_require__ !== "undefined") {
        return __webpack_require__(id); // eslint-disable-line
      }
      return eval("module.require")(id).ReactSelectDemo;
    },
    resolve() {
      if (require.resolveWeak) {
        return require.resolveWeak("./ReactSelectDemo");
      }
      return require("path").resolve(__dirname, "./ReactSelectDemo");
    }
  },
  {
    fallback: (
      <Typography variant="h6">
        {"<ReactSelectDemo/>"} is loading ...
      </Typography>
    )
  }
);

const ReactWindowDemo = loadable(
  {
    chunkName() {
      return "ReactWindowDemo";
    },
    isReady(props) {
      if (typeof __webpack_modules__ !== "undefined") {
        return !!__webpack_modules__[this.resolve(props)]; // eslint-disable-line
      }
      return false;
    },
    requireAsync: () =>
      import(/* webpackChunkName: "ReactWindowDemo" */ "./ReactWindowDemo"),
    requireSync(props) {
      const id = this.resolve(props);
      if (typeof __webpack_require__ !== "undefined") {
        return __webpack_require__(id); // eslint-disable-line
      }
      return eval("module.require")(id);
    },
    resolve() {
      if (require.resolveWeak) {
        return require.resolveWeak("./ReactWindowDemo");
      }
      return require("path").resolve(__dirname, "./ReactWindowDemo");
    }
  },
  {
    fallback: (
      <Typography variant="h6">
        {"<ReactWindowDemo/>"} is loading ...
      </Typography>
    )
  }
);

export default () => (
  <>
    <ReactSelectDemo />
    <ReactWindowDemo />
  </>
);
