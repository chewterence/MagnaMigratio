import React, { memo } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Line
} from "react-simple-maps";

import line_coordinates_data from './line_coordinates.json'

// Canada: 56.1304° N, 106.3468° W

const MapChart = ({ setTooltipContent, selectedYear}) => {
  // NOTE: [LONGITUDE, LATITUDE] east is positive west is negative
  const coordinates = line_coordinates_data[selectedYear];

  var migrationLines = [];
  // This is where the migration lines are styled and loaded
  for (var i = 0; i < coordinates.length; i++) {
    var coor_from=coordinates[i][0];
    var coor_to=coordinates[i][1];

    migrationLines.push(
      <Line
        from={coor_from}
        to={coor_to}
        stroke="#3498DB"
        strokeWidth={0.25}
        strokeLinecap="round"
        fill="transparent"
      />
    );
  }

  return (
    <div data-tip="">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [0, 30],
          scale: 100
        }}
        height={350}
      >
        <ZoomableGroup>
          <Geographies geography="/worldmap.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.name}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                  stroke="#000000"
                  strokeWidth={0.1}
                />
              ))
            }
          </Geographies>

          {migrationLines}
          </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
