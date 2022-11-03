import React, { useState } from "react";
import { Slider, Typography } from '@mui/material';
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";

function DataVisualization() {

  const [content, setContent] = useState("");

  const [state, setstate] = useState({data: 2008})

  const updateYear = (event, year) => {
    setstate({data: year});
  };

  return (
    <div>
      <Typography variant="overline" align="center">
        Current Year: {state.data}
      </Typography>
      <br></br>
      <Slider
        aria-label="Year"
        defaultValue={1982}
        onChange={updateYear}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1959}
        max={2016}
        color="secondary"
      />
      <br></br>
      <br></br>
      <MapChart setTooltipContent={setContent} selectedYear={state.data} />
      <ReactTooltip>{content}</ReactTooltip>



    </div>
  );
}

export default DataVisualization;
