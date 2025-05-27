import React, { createContext, useState, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState(localStorage.getItem("lastCity") || "Delhi");
    const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");

    useEffect(() => {
        localStorage.setItem("lastCity", city);
    }, [city]);

    useEffect(() => {
        localStorage.setItem("unit", unit);
    }, [unit]);

    return (
        <WeatherContext.Provider value={{ city, setCity, unit, setUnit }}>
            {children}
        </WeatherContext.Provider>
    );
};
