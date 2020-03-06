import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  setSelectOptionsAction,
  setSelectedOptionAction
} from "../settings/actions";
import { useSelector, useDispatch } from "react-redux";
import Select, { components } from "react-select";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  outer: {
    margin: "10px 0"
  }
});

const colourOptions = async () => [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" }
];

export default function ReactSelectDemo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectOptions = useSelector(state => state.selectOptions);
  const selectedOption = useSelector(state => state.selectedOption);
  useEffect(() => {
    (async () => {
      const _options = await colourOptions();
      dispatch(setSelectOptionsAction(_options));
      dispatch(setSelectedOptionAction(_options.filter(_ => _.isFixed)));
    })();
  }, []);
  const handleChange = (selected, action) => {
    console.log(action);
    dispatch(setSelectedOptionAction(selected));
  };
  return (
    <Grid className={classes.outer} container justify="center">
      <Grid item xs={4}>
        <Select
          isMulti
          value={selectedOption.value}
          name="colors"
          options={selectOptions.value}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          components={{
            MultiValueLabel: CustomMultiValueLabel
          }}
        />
      </Grid>
    </Grid>
  );
}
const useStyles1 = makeStyles({
  label: attr => ({
    color: attr.color
  })
});
function CustomMultiValueLabel({ children, ...props }) {
  const classes = useStyles1(props.data);
  return (
    <components.MultiValueLabel {...props}>
      <strong className={classes.label}>{children}</strong>
    </components.MultiValueLabel>
  );
}
CustomMultiValueLabel.propTypes = {
  children: PropTypes.string,
  data: PropTypes.object,
  props: PropTypes.shape({
    data: PropTypes.shape({
      color: PropTypes.string
    })
  })
};
