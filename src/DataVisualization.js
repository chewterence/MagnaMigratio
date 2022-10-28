import React, { useState } from "react";
import { Slider } from '@mui/material';
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";


function DataVisualization() {
  const [content, setContent] = useState("");

  const changeValue = (event, year) => {
    console.log(year);
  };

  return (
    <div>
      <MapChart setTooltipContent={setContent} />

      <ReactTooltip>{content}</ReactTooltip>

      <Slider
        aria-label="Temperature"
        defaultValue={1982}
        onChangeCommitted={changeValue}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1959}
        max={2010}
      />

    </div>
  );
}

export default DataVisualization;
