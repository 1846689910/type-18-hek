import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
export default LocalContext;

export const LocalProvider = ({ children }) => {
  const { Provider } = LocalContext;
  const [map, setMap] = useState(undefined);
  const [baseLayer, setBaseLayer] = useState(undefined);
  const [markers, setMarkers] = useState([]);
  const [prevFields, setPrevFields] = useState(undefined);
  const [selectedMarkerOption, setSelectedMarkerOption] = useState(undefined);
  const [showEditor, setShowEditor] = useState(false);
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
        greeting,
        selectedMarkerOption,
        setSelectedMarkerOption,
        prevFields,
        setPrevFields,
        showEditor,
        setShowEditor
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
