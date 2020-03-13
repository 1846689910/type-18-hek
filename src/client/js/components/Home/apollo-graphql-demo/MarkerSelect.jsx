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
  const { data, markers, map, selectedMarkerOption, setSelectedMarkerOption } = useContext(LocalContext);
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
    if (selectedMarkerOption) {
      selectedMarkerOption.value.closePopup();
      map.flyTo(initLatLng, initZoom, { animate: true, duration: 3, easeLinearity: 1 });
      await Promise.delay(3000);
    }
    marker.fire("click");
    setSelectedMarkerOption(selected);
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
        <Select value={selectedMarkerOption} options={landmarkOptions} onChange={handleChange} />
      </Grid>
    </Grid>
  );
}
