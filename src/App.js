import DataVisualization from "./DataVisualization";
import Header from "./Header";
// import { Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Typography variant="h1" align="center">
          GET1030 project
        </Typography> */}
        <Header />
        {/* <p>
          a GET1030 project (will make this part nicer when i feel like it lol)
        </p>
        Just slide the slider at the bottom of this page to see how the edges in the graph change */}
      </header>
      <DataVisualization />
    </div>
  );
}

export default App;
