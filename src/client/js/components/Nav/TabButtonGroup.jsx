import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Button,
  ButtonGroup,
  Menu,
  MenuItem
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory, useRouteMatch } from "react-router-dom";

/**
 *
 * @description tab button with dropdown menu
 */
export default function TabButtonGroup({ route, classes }) {
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
          onClick={e => setFileAnchor(e.target)}
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
TabButtonGroup.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string,
    routes: PropTypes.object
  }),
  classes: PropTypes.object
};

function FolderDropdown(props) {
  const { anchorEl, handleClose, routes, classes } = props;
  const history = useHistory();
  const handleClick = fileId => {
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
          onClick={() => handleClick(x, i)}
        >
          {`File${x}`}
        </EachMenuItem>
      ))}
    </Menu>
  );
}
FolderDropdown.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  routes: PropTypes.object,
  classes: PropTypes.object
};

const useStyles = makeStyles(theme => ({
  subMenuItem: ({ routeMatch, fileId }) => ({
    background:
      routeMatch && routeMatch.params.fileId === `${fileId}`
        ? theme.palette.secondary.main
        : ""
  })
}));

const EachMenuItem = React.forwardRef(
  ({ children, routeMatch, fileId, ...props }, ref) => {
    const classes = useStyles({ routeMatch, fileId });
    return (
      <MenuItem ref={ref} className={classes.subMenuItem} {...props}>
        {children}
      </MenuItem>
    );
  }
);
EachMenuItem.propTypes = {
  children: PropTypes.string,
  routeMatch: PropTypes.object,
  fileId: PropTypes.number
};
