import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import './styles/App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = `b7ef150c1f1c38435b80a6be4fcbb9e4`; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


  const fetchWeather = async () => {
    console.log('Fetching weather for:', city);
    try {
      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data);
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  

  const handleSearch = (city) => {
    setCity(city);
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
};

export default App;
