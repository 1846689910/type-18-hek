import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { LocalProvider } from "./LocalContext";
import Map from "./Map";
import MarkerSelect from "./MarkerSelect";

const useStyles = makeStyles({
  outer: {
    position: "relative"
  }
});

export default function ApolloGraphqlDemo() {
  const classes = useStyles();
  return (
    <LocalProvider>
      <Grid container justify="center" className={classes.outer}>
        <Map />
        <MarkerSelect />
      </Grid>
    </LocalProvider>
  );
}
