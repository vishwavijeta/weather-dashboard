import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WEATHER_URL = (city, unit) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
const FORECAST_URL = (city, unit) =>
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`;

export const useWeatherApi = (city, unit) => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchWeather = async () => {
        setLoading(true);
        setError("");
        try {
            const [res1, res2] = await Promise.all([
                fetch(WEATHER_URL(city, unit)),
                fetch(FORECAST_URL(city, unit)),
            ]);
            if (!res1.ok) throw new Error("Weather not found");
            const weatherData = await res1.json();
            const forecastData = await res2.json();
            setWeather(weatherData);
            setForecast(forecastData);
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setForecast(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWeather();
        const timer = setInterval(fetchWeather, 30000);
        return () => clearInterval(timer);
    }, [city, unit]);

    return { weather, forecast, error, loading };
};
