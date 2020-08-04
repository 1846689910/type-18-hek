import React, { Fragment, useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  menu: {
    marginLeft: "-20px",
  },
  menuItem: {
    minWidth: "150px",
  },
  btn: {
    padding: "5px 0",
    minWidth: 0,
    width: "40px",
    zIndex: 999,
  },
});

type MobileTabButtonProps = {
  classes: Record<string, string>;
  tabs: TabType[];
};

export default function MobileTabButton({
  classes,
  tabs,
}: MobileTabButtonProps) {
  const [anchor, setAnchor] = useState(null);
  const mobileClasses = useStyles();
  return (
    <Fragment>
      <Button
        variant="contained"
        color="default"
        onClick={(e) => setAnchor(e.target)}
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
          ),
        )}
      </Menu>
    </Fragment>
  );
}

type TabType = {
  label: string;
  routes?: {
    path: string;
    fileIds: number[];
  };
  path: string;
};

type CustomMenuItemProps = {
  tab: TabType;
};

const CustomMenuItem = React.forwardRef<
  React.ComponentPropsWithRef<React.ElementType>,
  CustomMenuItemProps
>(
  (
    { tab }: CustomMenuItemProps,
    ref: React.ComponentPropsWithRef<React.ElementType>,
  ) => {
    const history = useHistory();
    const { label, path } = tab;
    return (
      <Fragment>
        <MenuItem ref={ref} onClick={() => history.push(path)}>
          {label}
        </MenuItem>
      </Fragment>
    );
  },
);

type CustomMenuItemWithSubmenuProps = {
  tab: TabType;
  setAnchor: (e: EventTarget) => void;
};

const CustomMenuItemWithSubmenu = React.forwardRef(
  (
    { tab, setAnchor: setUpperAnchor }: CustomMenuItemWithSubmenuProps,
    ref: React.ComponentPropsWithRef<React.ElementType>,
  ) => {
    const history = useHistory();
    const { label, routes, path } = tab;
    const [anchor, setAnchor] = useState(null);
    const handleClick = (x) => {
      history.push(routes.path.replace(":fileId", x));
      setAnchor(null);
      setUpperAnchor(null);
    };
    const folderClick = () => {
      history.push(path);
      setAnchor(null);
      setUpperAnchor(null);
    };
    return (
      <Fragment>
        <MenuItem ref={ref}>
          <div onClick={folderClick}>{label}</div>
          <IconButton size="small" onClick={(e) => setAnchor(e.target)}>
            <ArrowRightIcon />
          </IconButton>
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
  },
);
