import React from "react";
import styles from "./internal_error_page.module.scss";
import zyaeLogo from "../../../../assets/images/zyaeLogo.png";

const InternalErrorPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.error_display}>
        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
        <h3>Internal Server Error</h3>
        <p>
          Zyae encountered an unexpected error that prevented this content from
          loading.
        </p>
      </div>
    </div>
  );
};

export default InternalErrorPage;
