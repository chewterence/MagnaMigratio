import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import ReactTooltip from "react-tooltip";
import { Grid, Typography, Box, Card } from "@mui/material";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  return (
    <ComposableMap
      projection="geoMercator"
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}