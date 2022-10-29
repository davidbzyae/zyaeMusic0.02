import React from "react";
import styles from "./bottom_bar.module.scss";

import Navbar from "./Navbar/Navbar";
import Player from "./Player/Player";

// libs
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const BottomBar = () => {
  const [expanded, setExpanded] = React.useState(false);

  const expandFunct = () => {
    setExpanded((prev) => !prev);
    if (expanded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  };

  return (
    <div className={cx({ content: true, expanded: expanded })}>
      <Player expandFunct={expandFunct} expanded={expanded} />
      {!expanded && <span className={styles.divide_line}></span>}
      <Navbar expanded={expanded} />
    </div>
  );
};

export default BottomBar;
