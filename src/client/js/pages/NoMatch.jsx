import React, { useEffect, Fragment } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav";

export default function NoMatch() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push("/"), 1000);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container justify="center">
          <Typography component="h1">Not Found</Typography>
        </Grid>
      </Container>
    </Fragment>
  );
}
