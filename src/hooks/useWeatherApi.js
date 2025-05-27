import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// useRef to store error state across re-renders
export const useWeatherApi = (city, unit) => {
    const lastCityRef = useRef(city);

    // Reset error when city changes
    if (lastCityRef.current !== city) {
        lastCityRef.current = city;
    }

    const fetchWeather = async () => {
        if (!city) return null;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather not found");
        return res.json();
    };

    const fetchForecast = async () => {
        if (!city) return null;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Forecast not found");
        return res.json();
    };

    // React Query will re-run if 'city' or 'unit' changes
    const {
        data: weather,
        error: weatherError,
        isLoading: loadingWeather,
    } = useQuery({
        queryKey: ["weather", city, unit],
        queryFn: fetchWeather,
        enabled: !!city,
        refetchInterval: 30000,
        staleTime: 1000 * 60 * 2,
        retry: false, // Prevent React Query from retrying if there's an error
    });

    const {
        data: forecast,
        error: forecastError,
        isLoading: loadingForecast,
    } = useQuery({
        queryKey: ["forecast", city, unit],
        queryFn: fetchForecast,
        enabled: !!city && !weatherError, // Disable if weather has error
        refetchInterval: 30000,
        staleTime: 1000 * 60 * 2,
        retry: false,
    });

    // Only show error if one exists
    return {
        weather,
        forecast,
        error: weatherError || forecastError,
        loading: loadingWeather || loadingForecast,
    };
};
