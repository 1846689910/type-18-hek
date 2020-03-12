import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import L from "leaflet";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "400px"
  }
});

export default function ApolloGraphqlDemo() {
  const classes = useStyles();
  const [map, setMap] = useState(undefined);
  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([41.713, -100.281], 4);
      setMap(map);
      configureMap(map);
    }
  }, [mapRef]);
  return <Grid container justify="center"><div className={classes.map} ref={mapRef}/></Grid>;
}
/**
 * 
 * @param {L.Map} map 
 */
function configureMap(map){
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      // attribution:
      //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      //   '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      //   'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1
    }
  ).addTo(map);
}