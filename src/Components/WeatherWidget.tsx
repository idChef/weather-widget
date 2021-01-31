import { useState, useEffect } from "react";
import WeatherElements from "./WeatherElements";
import styled from "styled-components";
import IWeather from "../Assets/IWeather";

interface WeatherWidgetProps {
  citiesList: string[];
  colors: string[];
}

const WeatherWidget = ({ citiesList, colors }: WeatherWidgetProps) => {
  function drawCities() {
    let citiesToShow: string[] = [...citiesList];
    citiesToShow.sort(() => 0.5 - Math.random());
    citiesToShow.pop();
    citiesToShow.pop();
    return citiesToShow;
  }

  // Contains currently picked cities
  const [cities, setCities] = useState(drawCities());

  const [isLoading, setIsLoading] = useState(true);

  const [citiesResults, setCitiesResults] = useState<IWeather[]>([]);

  async function fetchCity(city) {
    let url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_APIKEY}&units=metric&lang=pl`;
    try {
      let response = await fetch(url);
      if(response.status === 200){
      let result = await response.json();
      setIsLoading(false)
      return result;
      } else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCities(cities) {
    let result: Array<IWeather> = [];
    let fetchResult: IWeather;

    for (let i = 0; i < cities.length; i++) {
      fetchResult = await fetchCity(cities[i]);
      result.push(fetchResult);
    }
    setCitiesResults(result);
  }



  useEffect(() => {
    const interval = setInterval(() => {
      fetchCities(cities);
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCities(drawCities());
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  useEffect(() => {
    fetchCities(cities);
  }, []);

  return (
    <WeatherContainer>
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          {citiesResults.map((item, index) => (
            <WeatherElements
              id={item.id}
              key={item.id}
              description={item.weather[0].description}
              temperature={Math.round(item.main.temp).toString()}
              localization={item.name}
              color={colors[index]}
              icon={item.weather[0].id}
            ></WeatherElements>
          ))}
        </>
      )}
    </WeatherContainer>
  );
};

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: solid 10px #fff;
  border-radius: 250px;
  border-top: solid 10px rgb(200, 200, 200);
  animation: spin 1s linear infinite;
  margin: 0 auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const WeatherContainer = styled.div`
  width: 93%;
  @media (min-width: 760px) {
    width: 600px;
    padding: 20px 50px;
    box-shadow: 0px 4px 7px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    background: linear-gradient(90.25deg, #52adff 0.21%, #aed1f1 99.77%);
  }
`;

export default WeatherWidget;
