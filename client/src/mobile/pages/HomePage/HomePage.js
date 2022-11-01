import React from "react";
import styles from "./home_page.module.scss";

import { useNavigate, useLocation } from "react-router-dom";
import { get as LockrGet, set as LockrSet, rm as LockrRM } from "lockr";

// helpers
import getUserData from "../../helpers/getUserData";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    if (!LockrGet("userData")) navigate("/login", { replace: true });
    else setUserData(LockrGet("userData"));
  }, []);

  return <>{userData && <Content userData={userData} />}</>;
};

const Content = ({ userData }) => {
  console.log(userData);
  return (
    <div className={styles.content}>
      <h2>Welcome, {userData.username}</h2>
    </div>
  );
};

export default Home;
