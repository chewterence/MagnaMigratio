import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent }) => {
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
                />
              ))
            }
          </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
