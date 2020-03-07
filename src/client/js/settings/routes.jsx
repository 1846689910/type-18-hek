import React, { Fragment } from "react";
import propTypes from "prop-types";
import Home from "../pages/Home";
import Demo1 from "../pages/Demo1";
import Demo2 from "../pages/Demo2";
import Folders from "../pages/Folders";
import NoMatch from "../pages/NoMatch";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const Root = props => {
  const { route, children } = props;
  console.log(props);
  return (
    <Fragment>
      {renderRoutes(route.routes, {
        all: "I am accessible from all routes by `props.all`"
      })}
      {children}
    </Fragment>
  );
};

Root.propTypes = {
  route: propTypes.object,
  children: propTypes.object
};

export const routes = [
  {
    path: "/",
    component: withRouter(Root),
    routes: [
      {
        path: "/",
        exact: true,
        key: "/",
        component: Home
      },
      {
        path: "/demo1",
        key: "/demo1",
        exact: true,
        component: Demo1,
        partial: {
          abc: "I am accessible only at `/demo` route by `props.route.partial`"
        }
      },
      {
        path: "/demo2/:id",
        key: "/demo2/:id",
        component: Demo2,
        exact: true
      },
      {
        path: "/folders/:folderId",
        key: "/folders/:folderId",
        component: Folders,
        exact: true,
      },
      {
        path: "/folders/:folderId/files/:fileId",
        key: "/folders/:folderId/files/:fileId",
        component: Folders,
        exact: true
      },
      {
        path: "/*",
        key: "/*",
        component: NoMatch
      }
    ]
  }
];
