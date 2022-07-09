import { useState, useEffect } from "react";
import api from "../services/api";

export default function Weather({ country }) {
  if (country.capital === undefined) {
    country.capital = country.name.common;
  }

  // variables
  const api_key = process.env.REACT_APP_API_KEY;

  // states
  const [weather, setWeather] = useState({});

  // effects
  useEffect(() => {
    api
      .getWeather(country, api_key)
      .then((response) => setWeather(response.data));
  }, [country, api_key]);

  console.log(weather);

  if (Object.keys(weather).length === 0) {
    return (
      <div>
        <h1>Weather in {country.capital}</h1>
        <p>Can't find weather in {country.capital}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Weather in {country.capital}</h1>
        <p>temperature {weather.main.temp}°C</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  }
}
