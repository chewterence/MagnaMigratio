import React, { useState } from "react";
import { Slider, Typography } from '@mui/material';
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import line_coordinates_data from './line_coordinates.json'

function DataVisualization() {

  const [content, setContent] = useState("");

  const [state, setstate] = useState({selectedYear: 1982, totalRefugees: 114049})

  const updateYear = (event, year) => {
    var coordinates = line_coordinates_data[year];
    var total = 0;
    for (var i = 0; i < coordinates.length; i++) {
      total += coordinates[i][3];
    }
    setstate({selectedYear: year, totalRefugees: total});
  };

  return (
    <div>
      <br></br>
      <Typography variant="h4" align="center">
        Current Year: {state.selectedYear}
      </Typography>
      <Typography variant="overline" align="center">
        Estimated Number of Refugees Around the World: {state.totalRefugees}
      </Typography>
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
      <MapChart setTooltipContent={setContent} selectedYear={state.selectedYear} />
      <ReactTooltip>{content}</ReactTooltip>

    </div>
  );
}

export default DataVisualization;
