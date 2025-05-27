import React from "react";
import styles from "./ForecastBar.module.css";

const ForecastBar = ({ forecast, unit }) => {
    if (!forecast || !forecast.list) return null;
    const daily = [];
    let prevDate = "";
    for (let item of forecast.list) {
        const date = item.dt_txt.split(" ")[0];
        if (date !== prevDate) {
            daily.push(item);
            prevDate = date;
        }
        if (daily.length === 7) break;
    }

    return (
        <div className={styles.bar}>
            {daily.map((item, i) => (
                <div className={styles.day} key={i}>
                    <div className={styles.weekday}>{new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className={styles.icon} alt="" />
                    <div className={styles.temp}>{Math.round(item.main.temp)}°{unit === "metric" ? "C" : "F"}</div>
                </div>
            ))}
        </div>
    );
};

export default ForecastBar;
