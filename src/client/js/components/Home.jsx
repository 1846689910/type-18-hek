import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Container, Grid } from "@material-ui/core";
import Nav from "./Nav";
import DemoWrapper from "./DemoWrapper";
import ModuledStyleDemo from "./ModuledStyleDemo";
import DynamicImportDemo from "./DynamicImportDemo";


export default function Home(props) {
  console.log(props.all);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <DemoWrapper title="CSS Module Demo">
            <ModuledStyleDemo />
          </DemoWrapper>
          <DemoWrapper title="Dynamic Import Demo">
            <DynamicImportDemo />
          </DemoWrapper>
        </Grid>
      </Container>
    </Fragment>
  );
}
Home.propTypes = {
  all: PropTypes.string
};