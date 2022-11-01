import React from "react";
import styles from "./login_page.module.scss";
import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";
import { get as LockrGet, set as LockrSet, rm as LockrRM } from "lockr";

// helpers
import getUserData from "../../helpers/getUserData";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = React.useState({
    username: "",
    password: "",
    confirm_pass: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    getUserData({ username: loginData.username, password: loginData.password })
      .then((response) => {
        LockrSet("userData", response.data.response);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (signupData.password == signupData.confirm_pass) {
      const signUpRequest = {
        url: "https://zyae.net/music/api/db/userData/",
        method: "POST",
        data: {
          username: signupData.username,
          password: signupData.password,
        },
      };
      axios(signUpRequest)
        .then((response) => {
          if (!response.data.error) {
            LockrSet("userData", response.data.response);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          setErrorMessage(err.response.data.response);
        });
    } else {
      setErrorMessage("Passwords don't match!");
    }
  };

  return (
    <div className={styles.content}>
      {isLogin ? (
        <div className={styles.interface_box}>
          <div className={styles.header_wrapper}>
            <h2 className={styles.head}>Hey there,</h2>
            <p className={styles.sub}>Log in to access more free features ✨</p>
          </div>
          <div className={styles.interface_form}>
            <form id="login_form" onSubmit={handleLogin}>
              <div className={styles.input_wrapper}>
                <i className="fa-solid fa-user"></i>
                <input
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      ["username"]: e.target.value,
                    }))
                  }
                  value={loginData.username || ""}
                  autoComplete="off"
                  type="text"
                  placeholder="User"
                ></input>
              </div>
              <div className={styles.input_wrapper}>
                <i className="fa-solid fa-lock"></i>
                <input
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      ["password"]: e.target.value,
                    }))
                  }
                  value={loginData.password || ""}
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                ></input>
              </div>
              <p className={styles.error_message}>{errorMessage}</p>
              <div className={styles.button_wrapper}>
                <button type="submit">Login</button>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.interface_box}>
          <div className={styles.header_wrapper}>
            <h2 className={styles.head}>Welcome to Zyae!</h2>
            <p className={styles.sub}>
              Glad your here, lets get your account up and running 👍
            </p>
          </div>
          <div className={styles.interface_form}>
            <form id="signup_form" onSubmit={handleSignUp}>
              <div className={styles.input_wrapper}>
                <i className="fa-solid fa-user"></i>
                <input
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      ["username"]: e.target.value,
                    }))
                  }
                  value={signupData.username || ""}
                  autoComplete="off"
                  type="text"
                  placeholder="User"
                ></input>
              </div>
              <div className={styles.input_wrapper}>
                <i className="fa-solid fa-lock"></i>
                <input
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      ["password"]: e.target.value,
                    }))
                  }
                  value={signupData.password || ""}
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                ></input>
              </div>
              <div className={styles.input_wrapper}>
                <i className="fa-solid fa-square-check"></i>{" "}
                <input
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      ["confirm_pass"]: e.target.value,
                    }))
                  }
                  value={signupData.confirm_pass || ""}
                  autoComplete="off"
                  type="password"
                  placeholder="Confirm Password"
                ></input>
              </div>
              <p className={styles.error_message}>{errorMessage}</p>
              <div className={styles.button_wrapper}>
                <button type="submit">Sign up</button>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </form>
          </div>
        </div>
      )}
      <p
        onClick={() => setIsLogin((prevVal) => !prevVal)}
        className={styles.toggle_form}
      >
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </p>
    </div>
  );
};

export default LoginPage;
