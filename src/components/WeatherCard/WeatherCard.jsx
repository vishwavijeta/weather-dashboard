import React from "react";
import styles from "./WeatherCard.module.css";
import LocationTime from "../LocationTime/LocationTime";
import ForecastBar from "../ForecastBar/ForecastBar";

const WeatherCard = ({ weather, forecast, city, unit }) => {
    if (!weather || !forecast) return null;
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
    const temp = Math.round(weather.main.temp);

    return (
        <div className={styles.card}>
            <LocationTime city={city} />
            <div className={styles.currentSection}>
                <div className={styles.left}>
                    <div className={styles.label}>
                        <span role="img" aria-label="weather">☀️</span> WEATHER
                    </div>
                    <div className={styles.tempRow}>
                        <div className={styles.temp}>{temp}°</div>
                        <img src={iconUrl} className={styles.bigIcon} alt={weather.weather[0].main} />
                    </div>
                    <div className={styles.details}>
                        <div>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
                        </div>
                        <div>{weather.weather[0].main}</div>
                        <div>{Math.round(weather.wind.speed)} mph / {Math.round(weather.main.feels_like)}°</div>
                    </div>
                </div>
            </div>
            <ForecastBar forecast={forecast} unit={unit} />
        </div>
    );
};

export default WeatherCard;
