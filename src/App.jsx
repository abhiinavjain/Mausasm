import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import './styles/WeatherInfo.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    console.log(process.env);


    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2 className="city-name">{weatherData.city.name}, {weatherData.city.country}</h2>
          <div className="forecast">
            {weatherData.list.slice(0, 5).map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="forecast-item">
                  <div className="day">
                    {new Date(day.dt_txt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="temp">
                    {Math.round(day.main.temp)}°C
                  </div>
                  <div className="icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                    />
                  </div>
                </div>
                <div className="description">
                  {day.weather[0].description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
