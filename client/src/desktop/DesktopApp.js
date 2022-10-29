import React from "react";
import styles from "../assets/styles/app.module.scss";

// libs
import axios from "axios";
import { isBrowser, isMobile } from "react-device-detect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import FavoritesPage from "./pages/FavoritesPage";
import PlaylistPage from "./pages/PlaylistPage";
import NotFoundPage from "./pages/NotFoundPage";

// components
import Navbar from "./components/Navbar";

const DesktopApp = () => {
  const [userData, setUserData] = React.useState({ username: "" });

  React.useEffect(() => {
    const options = {
      url: process.env.REACT_APP_DB_URL + "userData/u1665450302950",
      method: "GET",
    };
    axios(options)
      .then((res) => {
        setUserData(res.data.response);
      })
      .catch((err) => {
        console.log(process.env.REACT_APP_DB_URL);
      });
  }, []);

  return (
    <Router basename={"/music"}>
      <div className={styles.content}>
        <Navbar userName={userData.username} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/playlist/:playlist_id" element={<PlaylistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default DesktopApp;
