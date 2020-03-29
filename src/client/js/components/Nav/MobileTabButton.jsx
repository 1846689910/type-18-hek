import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  menu: {
    marginLeft: "-20px"
  },
  menuItem: {
    minWidth: "150px"
  },
  btn: {
    padding: "5px 0",
    minWidth: 0,
    width: "40px",
    zIndex: 999
  }
});

export default function MobileTabButton({ classes, tabs }) {
  const [anchor, setAnchor] = useState(null);
  const mobileClasses = useStyles();
  return (
    <Fragment>
      <Button
        variant="contained"
        color="default"
        onClick={e => setAnchor(e.target)}
        size="small"
        className={mobileClasses.btn}
      >
        <MenuIcon />
      </Button>
      <Menu
        className={clsx(classes.menu, mobileClasses.menu)}
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {tabs.map((x, i) =>
          x.routes ? (
            <CustomMenuItemWithSubmenu key={i} tab={x} setAnchor={setAnchor} />
          ) : (
            <CustomMenuItem key={i} tab={x} />
          )
        )}
      </Menu>
    </Fragment>
  );
}
MobileTabButton.propTypes = {
  classes: PropTypes.object,
  tabs: PropTypes.array
};

const CustomMenuItem = React.forwardRef(({ tab }, ref) => {
  const history = useHistory();
  const { label, path } = tab;
  return (
    <Fragment>
      <MenuItem ref={ref} onClick={() => history.push(path)}>
        {label}
      </MenuItem>
    </Fragment>
  );
});
CustomMenuItem.propTypes = {
  tab: PropTypes.object
};

const CustomMenuItemWithSubmenu = React.forwardRef(
  ({ tab, setAnchor: setUpperAnchor }, ref) => {
    const history = useHistory();
    const { label, routes } = tab;
    const [anchor, setAnchor] = useState(null);
    const handleClick = x => {
      history.push(routes.path.replace(":fileId", x));
      setAnchor(null);
      setUpperAnchor(null);
    };
    return (
      <Fragment>
        <MenuItem ref={ref} onClick={e => setAnchor(e.target)}>
          {label}
          {<ArrowRightIcon />}
        </MenuItem>
        {
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
          >
            {routes.fileIds.map((x, i) => (
              <MenuItem
                key={i}
                onClick={() => handleClick(x)}
              >{`File${x}`}</MenuItem>
            ))}
          </Menu>
        }
      </Fragment>
    );
  }
);
CustomMenuItemWithSubmenu.propTypes = {
  tab: PropTypes.object,
  setAnchor: PropTypes.func
};
