import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, AppBar, makeStyles } from "@material-ui/core";
import Title from "./Title";
import TabButton from "./TabButton";
import TabButtonGroup from "./TabButtonGroup";

const useStyles = makeStyles({
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
    margin: "0 20px",
    textTransform: "none",
    fontWeight: "bold"
  },
  btnGroup_btn: {
    fontWeight: "bold",
    textTransform: "none"
  },
  folders_btn: {
    width: "20px"
  }
});

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
      <Title classes={classes} />
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="md">
          <Grid
            container
            className={classes.container_grid}
            alignItems="center"
          >
            <Grid container justify="center">
              {tabs.map((x, i) => {
                const TabBtn = x.routes ? TabButtonGroup : TabButton;
                return <TabBtn route={x} classes={classes} key={i} />;
              })}
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Fragment>
  );
}
