import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../../styles/App.scss";
import "../../styles/App.css";
import "../../styles/App.less";
import "../../styles/App.styl";
import css1 from "../../styles/moduled/App.module.css";
import less1 from "../../styles/moduled/App.module.less";
import scss1 from "../../styles/moduled/App.module.scss";
import stylus1 from "../../styles/moduled/App.module.styl";
import { Container, Grid, Typography } from "@material-ui/core";
import Nav from "./Nav";

function ModuledStyleDemo(){
  return (
    <Grid container justify="space-evenly">
      <Grid item>
        <div className={css1.css}>CSS Module + CSS</div>
      </Grid>
      <Grid item>
        <div className={scss1.scss}>CSS Module + SCSS</div>
      </Grid>
      <Grid item>
        <div className={less1.less}>CSS Module + LESS</div>
      </Grid>
      <Grid item>
        <div className={stylus1.stylus}>CSS Module + STYLUS</div>
      </Grid>
    </Grid>
  );
}

export default function Home(props) {
  console.log(props.all);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container justify="center">
            <Typography variant="h5">The {"<Home/>"} component</Typography>
          </Grid>
          <ModuledStyleDemo/>
        </Grid>
      </Container>
    </Fragment>
  );
}
Home.propTypes = {
  all: PropTypes.string
};