import React from "react";
import styles from "./assets/styles/app.module.scss";

// libs
import axios from "axios";
import { isBrowser, isMobile } from "react-device-detect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MobileApp from "./mobile/MobileApp";
import DesktopApp from "./desktop/DesktopApp";

const getBasename = (path) => path.substr(0, path.lastIndexOf("/"));

const App = () => {
  return <div>{isBrowser ? <DesktopApp /> : <MobileApp />}</div>;
};

export default App;
