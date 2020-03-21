import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Container } from "@material-ui/core";
import Nav from "../components/Nav";
import DemoWrapper from "../components/DemoWrapper";
import ReduxStateDemo from "../components/Demo1/ReduxStateDemo";
import RecomposeDemo from "../components/Demo1/RecomposeDemo";

export default function Demo1(props) {
  console.log(props.route.partial);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <DemoWrapper title="Redux State Demo">
            <ReduxStateDemo/>
          </DemoWrapper>
          <DemoWrapper title="Recompose Demo">
            <RecomposeDemo />
          </DemoWrapper>
        </Grid>
      </Container>
    </Fragment>
  );
}
Demo1.propTypes = {
  route: PropTypes.object
};
