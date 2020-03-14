import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles, IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Select, { components } from "react-select";
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
  const {
    data,
    markers,
    map,
    selectedMarkerOption,
    setSelectedMarkerOption
  } = useContext(LocalContext);
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
      map.flyTo(initLatLng, initZoom, {
        animate: true,
        duration: 3,
        easeLinearity: 1
      });
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
        <Select
          value={selectedMarkerOption}
          options={landmarkOptions}
          onChange={handleChange}
          components={{
            Option: CustomOption
          }}
        />
      </Grid>
    </Grid>
  );
}
function CustomOption({ children, ...props }) {
  const { setShowEditor } = useContext(LocalContext);
  const handleUpdate = e => {
    e.stopPropagation();
    setShowEditor(true);
  };
  const handleDelete = e => {
    e.stopPropagation();
  };
  return (
    <components.Option {...props}>
      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <IconButton size="small" onClick={handleUpdate} color="primary">
            <EditOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <IconButton size="small" onClick={handleDelete} color="secondary">
            <DeleteOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </components.Option>
  );
}
CustomOption.propTypes = {
  children: PropTypes.string,
  data: PropTypes.object,
  props: PropTypes.object
};
