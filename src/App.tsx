import React from "react";
import WeatherWidget from "./Components/WeatherWidget";

const listOfCities: string[] = [
  "Lodz",
  "Warszawa",
  "Berlin",
  "New York",
  "London",
];

function App() {
  return (
    <>
      <h1>Weather widget</h1>
      <WeatherWidget
        data={listOfCities}
        colors={["204", "360", "20"]}
      ></WeatherWidget>
    </>
  );
}

export default App;
