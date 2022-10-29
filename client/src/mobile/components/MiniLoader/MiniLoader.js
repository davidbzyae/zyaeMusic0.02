import React from "react";
import styles from "./mini_loader.module.scss";

const MiniLoader = ({ size }) => {
  return (
    <div
      className={styles.spinner}
      style={{
        fontSize: size,
      }}
    >
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
    </div>
  );
};

export default MiniLoader;
