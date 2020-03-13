import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { LocalProvider } from "./LocalContext";
import loadable from "@loadable/component";


const useStyles = makeStyles({
  outer: {
    position: "relative"
  }
});

const MapDemo = loadable(() => import(/* webpackChunkName: "MapDemo" */ "./Map"), {
  ssr: false,
  fallback: (
    <Typography variant="h6">
      {"<MapDemo/>"} is loading ...
      </Typography>
  )
});

const MarkerSelectDemo = loadable(() => import(/* webpackChunkName: "MarkerSelectDemo" */ "./MarkerSelect"), {
  ssr: false,
  fallback: (
    <Typography variant="h6">
      {"<MarkerSelectDemo/>"} is loading ...
      </Typography>
  )
});

export default function ApolloGraphqlDemo() {
  const classes = useStyles();
  return (
    <LocalProvider>
      <Grid container justify="center" className={classes.outer}>
        <MapDemo />
        <MarkerSelectDemo />
      </Grid>
    </LocalProvider>
  );
}
