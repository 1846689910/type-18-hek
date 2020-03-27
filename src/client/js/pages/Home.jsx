import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Container, Grid } from "@material-ui/core";
import Nav from "../components/Nav";
import DemoWrapper from "../components/DemoWrapper";
import ModuledStyleDemo from "../components/Home/ModuledStyleDemo";
import DynamicImportDemo from "../components/Home/DynamicImportDemo";
import ApolloGraphqlDemo from "../components/Home/apollo-graphql-demo";
import MediaQueryContext from "../components/MediaQueryContext";

export default function Home(props) {
  console.log(props.all);
  const { media } = useContext(MediaQueryContext);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <DemoWrapper title="Media Query Demo">
            <Grid container justify="center">media: {media}</Grid>
          </DemoWrapper>
          <DemoWrapper title="CSS Module Demo">
            <ModuledStyleDemo />
          </DemoWrapper>
          <DemoWrapper title="Dynamic Import Demo">
            <DynamicImportDemo />
          </DemoWrapper>
          <DemoWrapper title="Apollo GraphQL Demo">
            <ApolloGraphqlDemo />
          </DemoWrapper>
        </Grid>
      </Container>
    </Fragment>
  );
}
Home.propTypes = {
  all: PropTypes.string
};