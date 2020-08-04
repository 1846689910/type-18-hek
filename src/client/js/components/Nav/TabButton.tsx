import React from "react";
import { Button } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";

type TabButtonProps = {
  route: {
    key: string;
    label: string;
    path: string;
    routes?: {
      fileIds: number[];
      path: string;
    };

  };
  classes: Record<string, string>;
};

/**
 *
 * @description regular tab button
 */
export default function TabButton({ route, classes }: TabButtonProps) {
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
