import React from "react";
import styles from "./progressive_img.module.scss";

const ProgressiveImg = ({ src, alt }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);

  return (
    <img
      onLoad={(e) => {
        setImgLoaded(true);
        e.target.className = styles.progressive_img_loaded;
      }}
      className={styles.progressive_img}
      src={src}
      alt={alt || ""}
    />
  );
};
export default ProgressiveImg;
