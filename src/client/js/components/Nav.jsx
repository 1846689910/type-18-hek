import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  AppBar,
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
  Menu,
  MenuItem
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  hc: {
    height: "60px"
  },
  hcg: {
    height: "100%"
  },
  menu: {
    marginTop: "45px"
  },
  container_grid: {
    width: "100%",
    height: "50px"
  },
  btnGroup: {
    margin: "0 20px"
  },
  btnGroup_btn: {
    fontWeight: "bold",
    textTransform: "none"
  },
  folders_btn: {
    width: "20px"
  },
  subMenuItemMatch: {
    background: theme.palette.secondary.main
  },
  subMenuItemUnmatch: {
    background: ""
  }
}));

export default function Nav() {
  const classes = useStyles();
  const counter = useSelector(state => state.counter);
  const tabs = [
    { path: "/", label: "Home", key: "/" },
    { path: "/demo1", label: "Demo1", key: "/demo1" },
    {
      path: "/folders/123",
      key: "/folders/:folderId",
      label: "Folders",
      routes: {
        path: "/folders/123/files/:fileId",
        key: "/folders/:folderId/files/:fileId",
        fileIds: [123, 456, 789]
      }
    },
    { path: `/demo2/${counter.value}`, label: "Demo2", key: "/demo2/:id" }
  ];
  return (
    <Fragment>
      <Title />
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="md">
          <Grid
            container
            className={classes.container_grid}
            alignItems="center"
          >
            <Grid container justify="center">
              {tabs.map((x, i) => <TabButton route={x} key={i}/>)}
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Fragment>
  );
}

function TabButton({ route }){
  const classes = useStyles();
  const [fileAnchor, setFileAnchor] = useState(null);
  const history = useHistory();
  const match = useRouteMatch(route.key);
  return <Fragment>
    <ButtonGroup className={classes.btnGroup}>
      <Button
        className={classes.btnGroup_btn}
        variant="contained"
        color={
          match && match.isExact
            ? "secondary"
            : "default"
        }
        onClick={() => history.push(route.path)}
      >
        {route.label}
      </Button>
      {route.label === "Folders" && (
        <Button
          className={classes.folders_btn}
          variant="contained"
          onClick={e => setFileAnchor(e.target)}
        >
          <ArrowDropDownIcon />
        </Button>
      )}
    </ButtonGroup>
    {route.label === "Folders" && (
      <FolderDropdown
        anchorEl={fileAnchor}
        handleClose={() => setFileAnchor(null)}
        dropdown={route.routes}
      />
    )}
  </Fragment>;
}
TabButton.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string,
    routes: PropTypes.object
  })
};

function Title() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Container className={classes.hc} maxWidth="md">
      <Grid className={classes.hcg} container alignItems="flex-end">
        <Typography variant="h4" onClick={() => history.push("/")}>
          Type 18 hek
        </Typography>
      </Grid>
    </Container>
  );
}

function FolderDropdown(props) {
  const { anchorEl, handleClose, dropdown } = props;
  const history = useHistory();
  const handleClick = fileId => {
    handleClose();
    history.push(`/folders/123/files/${fileId}`);
  };
  const routeMatch = useRouteMatch(dropdown.key);
  const classes = useStyles();
  return (
    <Menu
      id="simple-menu"
      className={classes.menu}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {dropdown.fileIds.map((x, i) => (
        <MenuItem
          key={i}
          className={
            routeMatch && routeMatch.params.fileId === `${x}`
              ? classes.subMenuItemMatch
              : classes.subMenuItemUnmatch
          }
          onClick={() => handleClick(x, i)}
        >
          File{x}
        </MenuItem>
      ))}
    </Menu>
  );
}
FolderDropdown.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  dropdown: PropTypes.object
};
