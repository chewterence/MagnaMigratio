import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line
} from "react-simple-maps";

import line_coordinates_data from './line_coordinates.json'

// Canada: 56.1304° N, 106.3468° W

const MapChart = ({ setTooltipContent }) => {
  // NOTE: [LONGITUDE, LATITUDE] east is positive west is negative
  // const coordinates = [{from: [106.3468, -56.1304], to: [116.006, 39.79128]}, {from: [37.7522, 55.6566], to: [-100.006, 23.7128]}, {from: [15.3522, 18.8566], to: [-3.006, 3.7128]}]
  const coordinates = line_coordinates_data['1959'];

  var migrationLines = [];
  // This is where the migration lines are loaded
  for (var i = 0; i < coordinates.length; i++) {
    migrationLines.push(
      <Line
        from={coordinates[i][0]}
        to={coordinates[i][1]}
        stroke="#3498DB"
        strokeWidth={1}
        strokeLinecap="round"
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

      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
