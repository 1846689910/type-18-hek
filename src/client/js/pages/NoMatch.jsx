import React, { useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function NoMatch() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push("/"), 1000);
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container justify="center">
        <Typography component="h1">Not Found</Typography>
      </Grid>
    </Container>
  );
}
