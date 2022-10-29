import React from "react";
import styles from "./page_header.module.scss";

const PageHeader = ({ img_url }) => {
  return (
    <>
      <div className={styles.head_img}>
        <div
          className={styles.head_img_frame}
          style={{
            backgroundImage: `url(${img_url})`,
          }}
        />
        <div className={styles.head_img_fade}></div>
      </div>
    </>
  );
};

export default PageHeader;
