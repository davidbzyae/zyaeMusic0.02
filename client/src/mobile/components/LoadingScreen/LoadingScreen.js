import React from "react";
import styles from "./loading_screen.module.scss";

const LoadingScreen = () => {
  window.scrollTo(0, 0);
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingScreen;
