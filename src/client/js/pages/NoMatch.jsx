import React, { useEffect, Fragment } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav";

export default function NoMatch() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push("/"), 500);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container justify="center" direction="column">
          <Grid container justify="center">
            <Typography component="h1">Not Found</Typography>
          </Grid>
          <Grid container justify="center">
            <Typography component="h3">Will route back to home page</Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
