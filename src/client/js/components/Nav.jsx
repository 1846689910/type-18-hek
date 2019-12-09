import React, { Fragment, useState } from "react";
import {
  Container,
  Grid,
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  styled,
  Typography
} from "@material-ui/core";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  hc: {
    height: "60px"
  },
  hcg: {
    height: "100%"
  }
});
export const MyTab = styled(Tab)({
  textTransform: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px"
});

export default function Nav() {
  const classes = useStyles();
  const counter = useSelector(state => state.counter);
  const tabs = ["/", "/demo1", `/demo2/${counter.value}`];
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = useState(
    tabs.find(x => x.startsWith(location.pathname))
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };
  const params = useParams();
  const routeMatch = useRouteMatch();
  console.log([history, location, params, routeMatch]);
  return (
    <Fragment>
      <Container className={classes.hc} maxWidth="md">
        <Grid className={classes.hcg} container alignItems="flex-end">
          <Typography variant="h4" onClick={() => history.push("/")}>
            Type 18 hek
          </Typography>
        </Grid>
      </Container>
      <AppBar position="static" className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          centered
        >
          <MyTab label="Home" value="/" />
          <MyTab label="Demo1" value="/demo1" />
          <MyTab label="Demo2" value={`/demo2/${counter.value}`} />
        </Tabs>
      </AppBar>
    </Fragment>
  );
}
