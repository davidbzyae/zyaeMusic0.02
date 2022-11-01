import { get as LockrGet, set as LockrSet } from "lockr";
import axios from "axios";

const getUserData = (creds) =>
  new Promise((resolve, reject) => {
    const login = {
      url: "https://zyae.net/music/api/db/userData/",
      method: "PUT",
      data: {
        username: creds.username,
        password: creds.password,
      },
    };
    axios(login)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((err) => reject(err));
  });

export default getUserData;
