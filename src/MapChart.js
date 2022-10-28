import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line
} from "react-simple-maps";
// import * as data from './worldmap.json';
// const {test} = data;

// import jsonData from './worldmap.json';

// const loadData = () => JSON.parse(JSON.stringify(jsonData));



const MapChart = ({ setTooltipContent }) => {

  const coordinates = [{from: [90.3522, 10.8566], to: [-74.006, 40.7128]}, {from: [35.3522, 28.8566], to: [-100.006, 23.7128]}, {from: [15.3522, 18.8566], to: [-3.006, 3.7128]}]
  var migrationLines = [];
  for (var i = 0; i < coordinates.length; i++) {
    migrationLines.push(
      <Line
        from={coordinates[i].from}
        to={coordinates[i].to}
        stroke="#FF5533"
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
