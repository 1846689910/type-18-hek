import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";


export default function Folders() {
  const location = useLocation();
  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            I am {location.pathname}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
