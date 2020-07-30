import React, { Fragment, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import { get, isNaN } from "lodash";
import { setCounterAction } from "../settings/actions";

export default function Demo2() {
  const location = useLocation();
  const dispatch = useDispatch();
  const mainCounter = useSelector((state) => state.counter.value);
  const params = useParams();
  useEffect(() => {
    const counter = parseInt(get(params, "id", 0));
    if (mainCounter !== counter && !isNaN(counter)) {
      dispatch(setCounterAction(counter));
    }
  }, []);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <strong>I am {location.pathname}</strong>
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
