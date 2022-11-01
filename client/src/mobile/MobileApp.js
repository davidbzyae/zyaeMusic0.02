import React from "react";
import styles from "../assets/styles/app.module.scss";

// libs
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import classNames from "classnames/bind";
import { get as LockrGet, set as LockrSet, rm as LockrRM } from "lockr";

// pages
import HomePage from "./pages/HomePage/HomePage";
import BrowsePage from "./pages/BrowsePage/BrowsePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import LoginPage from "./pages/loginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import InternalErrorPage from "./pages/ErrorPages/500x/InternalErrorPage";

// components
import BottomBar from "./components/BottomBar/BottomBar";

// helpers
import ScrollToTop from "./helpers/ScrollToTop";

const cx = classNames.bind(styles);
const MobileApp = () => {
  const [userData, setUserData] = React.useState({
    status: "unknown",
  });

  useNavigate.scrollRestoration = "manual";

  React.useEffect(() => {
    LockrSet("loading", false);
    const user_id = LockrGet("user_id");

    if (user_id) {
      const options = {
        url: process.env.REACT_APP_DB_URL + `userData/${user_id}`,
        method: "GET",
      };
      axios(options)
        .then((res) => {
          LockrSet("user_data", res.data.response);
          window.addEventListener("updateUserData");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Router basename="/music">
      <div className={styles.content}>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/browse/:query" element={<BrowsePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/artist/:artist_id" element={<ArtistPage />} />
            <Route path="/album/:album_id" element={<AlbumPage />} />
            <Route path="/playlist/:playlist_id" element={<PlaylistPage />} />
            <Route path="/error/500x" element={<InternalErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <div className={cx({ filler_elem: true, expanded: false })}></div>
        </main>
        <BottomBar />
      </div>
    </Router>
  );
};

export default MobileApp;
