import React from "react";
import loadable from "@loadable/component";
import { Typography } from "@material-ui/core";

// const ReactSelectDemo = loadable({
//   loader: () =>
//     import("./ReactSelectDemo").then(({ ReactSelectDemo }) => ReactSelectDemo),
//   loading: () => (
//     <Typography variant="h6">{"<ReactSelectDemo/>"} is loading ...</Typography>
//   )
// });
const ReactSelectDemo = loadable(
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
// const ReactWindowDemo = loadable({
//   loader: () => import("./ReactWindowDemo"),
//   loading: () => (
//     <Typography variant="h6">{"<ReactWindowDemo/>"} is loading ...</Typography>
//   )
// });
const ReactWindowDemo = loadable(() => import("./ReactWindowDemo"), {
  fallback: (
    <Typography variant="h6">{"<ReactWindowDemo/>"} is loading ...</Typography>
  )
});

export default () => (
  <>
    <ReactSelectDemo />
    <ReactWindowDemo />
  </>
);
