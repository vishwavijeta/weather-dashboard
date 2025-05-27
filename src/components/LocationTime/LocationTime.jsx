import React from "react";
import styles from "./LocationTime.module.css";

const LocationTime = ({ city }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedCity =
        city.length > 0
            ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
            : "";

    return (
        <div className={styles.locationTime}>
            <span className={styles.place}>{formattedCity}</span>
            <span className={styles.time}>{timeStr}</span>
        </div>
    );
};

export default LocationTime;
