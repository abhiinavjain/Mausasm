import React from "react";
import "./WeatherInfo.css";

function WeatherInfo({ weatherData }) {
  if (!weatherData) return null;

  // Group forecasts by date, keeping only the first forecast for each day
  const groupedForecasts = weatherData.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt_txt);
    const dateString = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      time:"numeric",
    });

    if (!acc[dateString]) {
      acc[dateString] = {
        ...forecast,
        formattedTime: date.toLocaleTimeString("en-US", { 
          hour: "numeric", 
          minute: "2-digit",
          hour12: true 
        })
      };
    }
    return acc;
  }, {});

  return (
    <div className="weather-info">
      <h2 className="city-name">
        {weatherData.city.name}, {weatherData.city.country}
      </h2>
      <div className="forecast">
        {Object.entries(groupedForecasts).map(([date, forecast]) => (
          <div className="forecast-day" key={date}>
            <div className="forecast-item">
              <span className="datetime">{date}</span>
              <span className="time">{forecast.formattedTime}</span>
              <span className="temp">
                {Math.round(forecast.main.temp)}°C
              </span>
              <span className="icon">
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                />
              </span>
            </div>
            <div className="description">
              {forecast.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInfo;