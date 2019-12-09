import React from "react";
import propTypes from "prop-types";
import Home from "../components/Home";
import Demo1 from "../components/Demo1";
import Demo2 from "../components/Demo2";
import NoMatch from "../components/NoMatch";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const Root = props => {
  const { route, children } = props;
  console.log(props);
  return (
    <div>
      {renderRoutes(route.routes, {
        all: "I am accessible from all routes by `props.all`"
      })}
      {children}
    </div>
  );
};

Root.propTypes = {
  route: propTypes.object,
  children: propTypes.object
};

const routes = [
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
        component: Demo2
      },
      {
        path: "/*",
        component: NoMatch
      }
    ]
  }
];

export { routes };
