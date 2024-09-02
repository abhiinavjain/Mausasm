import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = ({ forecast }) => {
  return (
    <div className="weather-container">
      {forecast.map((weather, index) => {
        const dateTime = new Date(weather.dt_txt);
        const date = dateTime.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        });
        const time = dateTime.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div className="weather-info" key={index}>
            <div className="date-time">
              <strong>{date}</strong> at <span>{time}</span>
            </div>
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="description">{weather.weather[0].description}</div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WeatherInfo;
