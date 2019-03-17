import React from "react";
import loadable from "@loadable/component";

const NamedLazyComp = loadable(() =>
  import(/* webpackChunkName: "demo-fake" */ "./demo-fake").then(module => ({ default: module.Fake }))
);
const DefaultLazyComp = loadable(() => import(/* webpackChunkName: "demo-fake" */ "./demo-fake"));

export default () => (
  <div>
    <h6>@loadable/component Dynamic Import</h6>
    <NamedLazyComp />
    <DefaultLazyComp />
  </div>
);
