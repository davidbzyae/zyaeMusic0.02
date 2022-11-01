import React from "react";
import styles from "./navbar.module.scss";

// libs
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Navbar = ({ expanded }) => {
  const navigate = useNavigate();

  return (
    <div className={cx({ navbar_container: true, expanded: expanded })}>
      <div
        className={cx({
          links: true,
        })}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
          className={cx({
            item_link: true,
            bold: useLocation().pathname === "/",
          })}
        >
          <i className="fa-solid fa-music"></i>
          Music
        </div>
        <div
          onClick={() => {
            navigate("/browse");
          }}
          className={cx({
            item_link: true,
            bold: useLocation().pathname.startsWith("/browse"),
          })}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          Browse
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
          <i className="fa-solid fa-fire"></i>
          Favorites
        </div>
      </div>
    </div>
  );
};

export default Navbar;
