import React, { useState } from "react";
import { Slider } from '@mui/material';
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
      <MapChart setTooltipContent={setContent} selectedYear={state.data} />
      <ReactTooltip>{content}</ReactTooltip>

      <Slider
        aria-label="Temperature"
        defaultValue={1982}
        onChange={updateYear}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1959}
        max={2016}
      />

    </div>
  );
}

export default DataVisualization;
