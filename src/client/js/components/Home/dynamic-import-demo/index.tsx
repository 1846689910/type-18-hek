import React from "react";
import loadable from "@loadable/component";
import { Typography } from "@material-ui/core";

const ReactSelectDemo = loadable(
  () => import(/* webpackChunkName: "ReactSelectDemo" */ "./ReactSelectDemo"),
  {
    fallback: (
      <Typography variant="h6">
        {"<ReactSelectDemo/>"} is loading ...
      </Typography>
    ),
  },
);

const ReactWindowDemo = loadable(
  () => import(/* webpackChunkName: "ReactWindowtDemo" */ "./ReactWindowDemo"),
  {
    fallback: (
      <Typography variant="h6">
        {"<ReactWindowDemo/>"} is loading ...
      </Typography>
    ),
  },
);

const DynamicImportDemo = (
  <>
    <ReactSelectDemo />
    <ReactWindowDemo />
  </>
);

export default DynamicImportDemo;
