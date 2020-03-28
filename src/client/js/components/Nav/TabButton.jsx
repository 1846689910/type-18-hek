import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";

/**
 *
 * @description regular tab button
 */
export default function TabButton({ route, classes }) {
  const history = useHistory();
  const match = useRouteMatch(route.key);
  return (
    <Button
      className={classes.btnGroup}
      variant="contained"
      color={match && match.isExact ? "secondary" : "default"}
      onClick={() => history.push(route.path)}
    >
      {route.label}
    </Button>
  );
}
TabButton.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string
  }),
  classes: PropTypes.object
};
