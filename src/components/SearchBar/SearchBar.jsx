import React, { useState, useContext } from "react";
import styles from "./SearchBar.module.css";
import { WeatherContext } from "../../context/WeatherContext";

const SearchBar = () => {
    const [input, setInput] = useState("");
    const { setCity } = useContext(WeatherContext);

    const handleSearch = (e) => {
        e.preventDefault();
        if (input.trim()) setCity(input.trim());
        setInput("");
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
                type="text"
                placeholder="Enter city..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>Search</button>
        </form>
    );
};

export default SearchBar;
