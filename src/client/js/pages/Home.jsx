import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Container, Grid } from "@material-ui/core";
import Nav from "../components/Nav";
import DemoWrapper from "../components/DemoWrapper";
import ModuledStyleDemo from "../components/Home/ModuledStyleDemo";
import DynamicImportDemo from "../components/Home/DynamicImportDemo";
import ApolloGraphqlDemo from "../components/Home/apollo-graphql-demo";

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
          <DemoWrapper title="Apollo Graphql Demo">
            <ApolloGraphqlDemo/>
          </DemoWrapper>
        </Grid>
      </Container>
    </Fragment>
  );
}
Home.propTypes = {
  all: PropTypes.string
};