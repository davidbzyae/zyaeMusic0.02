import axios from "axios";

import { get as LockrGet, set as LockrSet } from "lockr";

const getSearchData = (query) =>
  new Promise((resolve, reject) => {
    if (!LockrGet(query)) {
      const options = {
        url: process.env.REACT_APP_YTMUSIC_URL + "searchAll/" + query,
        method: "GET",
      };
      axios(options)
        .then((res) => {
          LockrSet(query, res.data.response);
          resolve(LockrGet(query));
        })
        .catch((err) => reject(err));
    } else {
      resolve(LockrGet(query));
    }
  });

export default getSearchData;
