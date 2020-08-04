import React, { Fragment } from "react";
import { Container, Grid } from "@material-ui/core";
import Nav from "../components/Nav";
import DemoWrapper from "../components/DemoWrapper";
import ModuledStyleDemo from "../components/Home/ModuledStyleDemo";
import DynamicImportDemo from "../components/Home/dynamic-import-demo";
import ApolloGraphqlDemo from "../components/Home/apollo-graphql-demo";

type HomeProps = {
  all: string;
};

export default function Home(props: HomeProps) {
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
          <DemoWrapper title="Apollo GraphQL Demo">
            <ApolloGraphqlDemo />
          </DemoWrapper>
        </Grid>
      </Container>
    </Fragment>
  );
}
