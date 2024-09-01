import React from "react";
import "./../styles/SearchBar.css";

const SearchBar = ({ setCity, fetchWeather }) => {
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={fetchWeather}>Search</button>
    </div>
  );
};

export default SearchBar;
