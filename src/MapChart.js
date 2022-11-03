import React, { memo } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Line,
  Marker
} from "react-simple-maps";

import line_coordinates_data from './line_coordinates.json'

const MapChart = ({ setTooltipContent, selectedYear}) => {
  // NOTE: [LONGITUDE, LATITUDE] east is positive west is negative
  const coordinates = line_coordinates_data[selectedYear];

  var migrationLines = [];
  // var originMarkers = [];

  // This is where the migration lines are styled and loaded
  for (var i = 0; i < coordinates.length; i++) {
    var coor_from = coordinates[i][0];
    var coor_to = coordinates[i][1];
    var norm_value = coordinates[i][2];
    // var value = coordinates[i][3];

    var strokeWidth = norm_value * 5;
    // var originPointSize = Math.log(value) / 2;

    migrationLines.push(
      <Line
        from={coor_from}
        to={coor_to}
        stroke="#3498DB"
        strokeWidth={strokeWidth}
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
                      fill: "#707070",
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

            {coordinates.map((c) => (
              <Marker coordinates={c[0]}
                onMouseEnter={() => {
                  setTooltipContent(c[4] + ": " + c[3] + " refugees");
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
              >
                <circle r={Math.log(c[3]) / 2} fill="#F53" />
              </Marker>
            ))}
          </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
