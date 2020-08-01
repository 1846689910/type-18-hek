import React, { useEffect, Fragment } from "react";
import { Container, Grid, Typography, styled } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav";

export default function NoMatch() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push("/"), 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Wrapper container justify="center" alignItems="center">
          <Grid container direction="column">
            <Grid container justify="center">
              <Typography variant="h4">404 Not Found</Typography>
            </Grid>
            <Grid container justify="center">
              <Typography variant="h5">
                routing back to home page
              </Typography>
            </Grid>
          </Grid>
        </Wrapper>
      </Container>
    </Fragment>
  );
}
const Wrapper = styled(Grid)({
  height: "60vh"
});