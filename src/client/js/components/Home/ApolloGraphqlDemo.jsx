import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext
} from "react";
import PropTypes from "prop-types";
import { renderToString } from "react-dom/server";
import L from "leaflet";
import { Grid, makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "400px"
  },
  popHeader: {
    textAlign: "center"
  },
  popContent: {
    margin: "5px 0"
  }
});

const LANDMARKS = gql`
  query Landmark($name: String, $address: String) {
    landmarks(name: $name, address: $address) {
      name
      address
      url
      description
      coordinates
    }
  }
`;

const HELLO_QUERY = gql`
  {
    hello
  }
`;

const LocalContext = createContext();
const LocalProvider = ({ children }) => {
  const { Provider } = LocalContext;
  const [map, setMap] = useState(undefined);
  const [baseLayer, setBaseLayer] = useState(undefined);
  const [markers, setMarkers] = useState([]);
  const { data } = useQuery(LANDMARKS);
  const { data: greeting } = useQuery(HELLO_QUERY);
  return (
    <Provider
      value={{
        map,
        setMap,
        baseLayer,
        setBaseLayer,
        markers,
        setMarkers,
        data,
        greeting
      }}
    >
      {children}
    </Provider>
  );
};
LocalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default function ApolloGraphqlDemo() {
  return (
    <LocalProvider>
      <Grid container justify="center">
        <Map />
      </Grid>
    </LocalProvider>
  );
}

function Map() {
  const classes = useStyles();
  const {
    map,
    setMap,
    baseLayer,
    setBaseLayer,
    setMarkers,
    data,
    greeting
  } = useContext(LocalContext);
  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current && !map) setMap(initMap(mapRef.current));
  }, [mapRef]);
  useEffect(() => {
    if (map && greeting && greeting.hello && !baseLayer) {
      setBaseLayer(configureBaseLayer(map, greeting.hello));
    }
  }, [map, greeting]);
  useEffect(() => {
    if (map && data && data.landmarks) {
      setMarkers(configureMarkers(map, data.landmarks));
    }
  }, [map, data]);
  return <div className={classes.map} ref={mapRef} />;
}

/**
 * @param {HTMLElement} dom
 * @returns {L.Map}
 */
function initMap(dom) {
  return L.map(dom).setView([41.713, -100.281], 4);
}
/**
 *
 * @param {L.Map} map
 * @param {String} layerAttr
 * @returns {L.TileLayer}
 */
function configureBaseLayer(map, layerAttr) {
  const baseLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution: layerAttr
    }
  );
  if (!map.hasLayer(baseLayer)) map.addLayer(baseLayer);
  return baseLayer;
}

/**
 *
 * @param {L.Map} map
 * @param {Object[]} landmarks
 * @returns {L.Marker[]}
 */
function configureMarkers(map, landmarks) {
  return landmarks.map(x => {
    const { coordinates, ...props } = x;
    const [lng, lat] = coordinates;
    return L.marker(L.latLng(lat, lng))
      .bindPopup(renderToString(<Popup {...props} />))
      .on("click", function() {
        map.flyTo(this.getLatLng(), 18, { animate: true, duration: 3 });
      })
      .addTo(map);
  });
}

function Popup({ name, address, description, url }) {
  const { popHeader, popContent } = useStyles();
  return (
    <div>
      <div className={popHeader}>
        <strong>
          <a href={url} target="_blank">
            {name}
          </a>
        </strong>
      </div>
      <div className={popContent}>
        <strong>{address}</strong>
      </div>
      <div className={popContent}>
        <strong>{description}</strong>
      </div>
    </div>
  );
}
Popup.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string
};
