import React from "react";
import styles from "../styles/navbar.module.scss";

// libs
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar_container}>
      <div className={styles.user_nav}>
        <span className={styles.user_info}>
          <i className={"fa-solid fa-user"}></i>
          <p className={styles.username}>{userName}</p>
        </span>
      </div>
      <div className={styles.links}>
        <div
          onClick={() => {
            navigate("/");
          }}
          className={cx({
            item_link: true,
            bold: useLocation().pathname === "/",
          })}
        >
          <i className="fa-solid fa-music"></i> Music
        </div>
        <div
          onClick={() => {
            navigate("/browse");
          }}
          className={cx({
            item_link: true,
            bold: useLocation().pathname === "/browse",
          })}
        >
          <i className="fa-solid fa-magnifying-glass"></i> Browse
        </div>
        <div
          onClick={() => {
            navigate("/favorites");
          }}
          className={cx({
            item_link: true,
            bold: useLocation().pathname === "/favorites",
          })}
        >
          <i className="fa-solid fa-fire"></i> Favorites
        </div>
      </div>
    </div>
  );
};

export default Navbar;
