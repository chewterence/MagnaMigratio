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
    // originMarkers.push(
    //   <Marker coordinates={coor_from}
    //     onMouseEnter={() => {
    //       updateToolTip(value);
    //     }}
    //     onMouseLeave={() => {
    //       setTooltipContent("");
    //     }}
    //   >
    //     <circle r={originPointSize} fill="#F53" />
    //   </Marker>
    // );
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
            {/* {({ coordinates }) =>
              coordinates.map((c) => (
                <div>
                  test
                </div>
                // <Marker coordinates={c.coor_from}
                //   onMouseEnter={() => {
                //     setTooltipContent(`${c.value}`);
                //   }}
                //   onMouseLeave={() => {
                //     setTooltipContent("");
                //   }}
                // >
                // <circle r={10} fill="#F53" />
                // </Marker>
              ))
            } */}
          {coordinates.map((c) => (
            <Marker coordinates={c[0]}
              onMouseEnter={() => {
                setTooltipContent(c[3]);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
            >
              <circle r={5} fill="#F53" />
            </Marker>
          ))}
          </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
