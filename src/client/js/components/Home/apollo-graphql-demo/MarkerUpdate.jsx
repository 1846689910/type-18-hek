import React, { useState, useContext } from "react";

import {
  Grid,
  makeStyles,
  Button,
  TextField,
  Typography
} from "@material-ui/core";
import LocalContext from "./LocalContext";

const useStyles = makeStyles({
  markerUpdate: {
    position: "absolute",
    zIndex: 99,
    top: "20px",
    left: "20px",
    height: "500px"
  },
  window: {
    height: "350px",
    background: "white",
    width: "100%",
    padding: "10px 0",
    borderRadius: "10px"
  },
  input: {
    height: "10px"
  },
  btns: {
    marginTop: "10px"
  },
  btn: {
    margin: "0 10px"
  }
});

const defaultFields = [
  { label: "Name", key: "name", value: "" },
  { label: "Coordinates", key: "coordinates", value: "" },
  { label: "Address", key: "address", value: "" },
  { label: "Description", key: "description", value: "" },
  { label: "Url", key: "url", value: "" }
];

export default function MarkerUpdate() {
  const { prevFields, setShowEditor } = useContext(LocalContext);
  const [fields, setFields] = useState(prevFields || defaultFields);
  const classes = useStyles();
  const handleChange = (value, i) => {
    fields[i].value = value;
    setFields([...fields]);
  };
  const isValid = () => {
    const coords = fields.find(x => x.key === "coordinates").value.split(",");
    return (
      fields.some(x => x.value.trim() !== "") &&
      coords.length === 2 &&
      coords.every(x => x.trim() !== "" && !isNaN(parseInt(x.trim())))
    );
  };
  const submit = () => {
    console.log(fields);
    setShowEditor(false); // TODO: get response from server for success update
  };
  return (
    <Grid
      item
      xs={12}
      container
      justify="center"
      alignItems="center"
      className={classes.markerUpdate}
    >
      <Grid item xs={6} className={classes.window} container direction="column">
        <Grid item container justify="center" alignItems="flex-end">
          <Typography variant={"h6"}>
            <strong>{prevFields ? "Update" : "Add"} Marker</strong>
          </Typography>
        </Grid>
        {fields.map(({ label, value }, i) => (
          <Grid item container key={i} justify="center" alignItems="flex-end">
            <Grid item xs={10}>
              <TextField
                autoFocus
                margin="dense"
                label={label}
                type="text"
                fullWidth
                value={value}
                onChange={e => handleChange(e.target.value, i)}
                inputProps={{
                  className: classes.input
                }}
              />
            </Grid>
          </Grid>
        ))}
        <Grid
          item
          container
          justify="flex-end"
          alignItems="center"
          className={classes.btns}
        >
          <Button
            className={classes.btn}
            color="secondary"
            variant="contained"
            onClick={() => setShowEditor(false)}
          >
            cancel
          </Button>
          <Button
            className={classes.btn}
            color="primary"
            variant="contained"
            disabled={!isValid()}
            onClick={submit}
          >
            submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
