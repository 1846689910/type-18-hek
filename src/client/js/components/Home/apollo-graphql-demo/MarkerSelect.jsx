import React, { useEffect, useState, useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Select from "react-select";
import LocalContext from "./LocalContext";
import Promise from "bluebird";
import { initLatLng, initZoom } from "./Map";

const useStyles = makeStyles({
  markerSelect: {
    position: "absolute",
    zIndex: 99,
    top: "20px",
    left: "20px"
  }
});

export default function MarkerSelect() {
  const classes = useStyles();
  const { data, markers, map } = useContext(LocalContext);
  const [sel, setSel] = useState(undefined);
  const [landmarkOptions, setLandmarkOptions] = useState([]);
  useEffect(() => {
    if (data && data.landmarks && markers.length > 0) {
      setLandmarkOptions(
        data.landmarks
          .map(({ name }, i) => ({
            value: markers[i],
            label: name
          }))
          .sort((x, y) => x.label.localeCompare(y.label))
      );
    }
  }, [data, markers]);
  const handleChange = async selected => {
    const marker = selected.value;
    if (sel) {
      sel.closePopup();
      map.flyTo(initLatLng, initZoom, { animate: true, duration: 3, easeLinearity: 1 });
      await Promise.delay(3000);
    }
    setSel(marker.fire("click"));
  };
  return (
    <Grid
      item
      xs={12}
      container
      justify="flex-start"
      className={classes.markerSelect}
    >
      <Grid item xs={5}>
        <Select options={landmarkOptions} onChange={handleChange} />
      </Grid>
    </Grid>
  );
}
