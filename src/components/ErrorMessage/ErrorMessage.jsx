import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <div className={styles.error}>{error}</div>;
};

export default ErrorMessage;
