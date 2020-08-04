import React, { Fragment } from "react";
import { Grid, Container } from "@material-ui/core";
import Nav from "../components/Nav";
import DemoWrapper from "../components/DemoWrapper";
import ReduxStateDemo from "../components/Demo1/ReduxStateDemo";
import RecomposeDemo from "../components/Demo1/RecomposeDemo";

type Demo1Props = {
  route: {
    partial: Record<string, string>;
  };
};

export default function Demo1(props: Demo1Props) {
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
