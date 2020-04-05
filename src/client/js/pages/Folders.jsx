import React, { Fragment } from "react";
import { Container, Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";


export default function Folders() {
  const location = useLocation();
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <strong>I am {location.pathname}</strong>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
