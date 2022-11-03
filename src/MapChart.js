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
                      fill: "#848484",
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

            {coordinates.map((c) => (
              <Line
                from={c[0]}
                to={c[1]}
                stroke="#3498DB"
                strokeWidth={c[2] * 5}
                strokeLinecap="round"
                fill="transparent"
                onMouseEnter={() => {
                  setTooltipContent(c[3] + " fleeing from " + c[4] + " to " + c[5]);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
              />
            ))}           
            
            {coordinates.map((c) => (
              <Marker coordinates={c[0]}
                onMouseEnter={() => {
                  setTooltipContent("Total: " + c[3] + " refugees from " + c[4]);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
              >
                <circle r={Math.log(c[3]) / 2} fill="#F53"
                />
              </Marker>
            ))}
          </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
