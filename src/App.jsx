import React, { useContext } from "react";
import { WeatherProvider, WeatherContext } from "./context/WeatherContext";
import { useWeatherApi } from "./hooks/useWeatherApi";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import styles from "./App.module.css";

const WeatherContent = () => {
  const { city, unit, setUnit } = useContext(WeatherContext);
  const { weather, forecast, error, loading } = useWeatherApi(city, unit);

  return (
    <div className={styles.container}>
      <h1>Weather Dashboard</h1>
      <div className={styles.unitSwitch}>
        <button
          onClick={() => setUnit("metric")}
          className={unit === "metric" ? styles.active : ""}
        >
          °C
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={unit === "imperial" ? styles.active : ""}
        >
          °F
        </button>
      </div>
      <SearchBar />
      <ErrorMessage error={error} />
      {loading ? <p>Loading...</p> : (
        <WeatherCard weather={weather} forecast={forecast} city={city} unit={unit} />
      )}
    </div>
  );
};

const App = () => (
  <WeatherProvider>
    <WeatherContent />
  </WeatherProvider>
);

export default App;
