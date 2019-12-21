import React from "react";
import loadable from "@loadable/component";
import { Typography } from "@material-ui/core";

const ReactSelectDemo = loadable(
  /* #__LOADABLE__ */
  () =>
    import("./ReactSelectDemo").then(({ ReactSelectDemo }) => ReactSelectDemo),
  {
    fallback: (
      <Typography variant="h6">
        {"<ReactSelectDemo/>"} is loading ...
      </Typography>
    )
  }
);
const ReactWindowDemo = loadable(
  /* #__LOADABLE__ */ () => import("./ReactWindowDemo"),
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
