import React, { Fragment, useState } from "react";
import {
  makeStyles,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory, useRouteMatch } from "react-router-dom";

type TabButtonGroupProps = {
  route: {
    key?: string;
    path: string;
    label: string;
    routes?: {
      fileIds: number[];
      path: string;
    };
  };
  classes: Record<string, string>;
};

/**
 *
 * @description tab button with dropdown menu
 */
export default function TabButtonGroup({
  route,
  classes,
}: TabButtonGroupProps) {
  const [fileAnchor, setFileAnchor] = useState(null);
  const history = useHistory();
  const match = useRouteMatch(route.key);
  return (
    <Fragment>
      <ButtonGroup className={classes.btnGroup}>
        <Button
          className={classes.btnGroup_btn}
          variant="contained"
          color={match && match.isExact ? "secondary" : "default"}
          onClick={() => history.push(route.path)}
        >
          {route.label}
        </Button>
        <Button
          className={classes.folders_btn}
          variant="contained"
          onClick={(e) => setFileAnchor(e.target)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      {route.label === "Folders" && (
        <FolderDropdown
          classes={classes}
          anchorEl={fileAnchor}
          handleClose={() => setFileAnchor(null)}
          routes={route.routes}
        />
      )}
    </Fragment>
  );
}

type FolderDropdownProps = {
  anchorEl: HTMLElement;
  handleClose: () => void;
  routes: {
    fileIds: number[];
    path: string;
    key?: string;
  };
  classes: Record<string, string>;
};

function FolderDropdown(props: FolderDropdownProps) {
  const { anchorEl, handleClose, routes, classes } = props;
  const history = useHistory();
  const handleClick = (fileId: number) => {
    handleClose();
    history.push(`/folders/123/files/${fileId}`);
  };
  const routeMatch = useRouteMatch(routes.key);
  return (
    <Menu
      id="simple-menu"
      className={classes.menu}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {routes.fileIds.map((x, i) => (
        <EachMenuItem
          key={i}
          fileId={x}
          routeMatch={routeMatch}
          onClick={() => handleClick(x)}
        >
          {`File${x}`}
        </EachMenuItem>
      ))}
    </Menu>
  );
}

const useStyles = makeStyles((theme) => ({
  subMenuItem: ({ routeMatch, fileId }: SubMenuItemProps) => ({
    background:
      routeMatch && routeMatch.params.fileId === `${fileId}`
        ? theme.palette.secondary.main
        : "",
    color:
      routeMatch && routeMatch.params.fileId === `${fileId}` ? "white" : "",
    fontWeight: "bold",
  }),
}));

type SubMenuItemProps = {
  fileId: number;
  routeMatch: {
    params: {
      fileId: string;
    };
  };
};

type EachMenuItemProps = {
  children: string | React.ReactElement | React.ReactElement[];
  fileId: number;
  routeMatch: {
    params: {
      fileId: number;
    };
  };
  onClick: () => void;
};

const EachMenuItem = React.forwardRef<never, EachMenuItemProps>(
  ({ children, routeMatch, fileId, ...props }: EachMenuItemProps, ref) => {
    const classes = useStyles({ routeMatch, fileId });
    return (
      <MenuItem ref={ref} className={classes.subMenuItem} {...props}>
        {children}
      </MenuItem>
    );
  },
);
