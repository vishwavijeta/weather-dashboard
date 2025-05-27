import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  // Handle both error object and string
  const errorMsg = error.message || error.toString();
  return <div className={styles.error}>{errorMsg}</div>;
};

export default ErrorMessage;
