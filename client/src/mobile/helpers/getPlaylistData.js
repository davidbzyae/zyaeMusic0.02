import React from "react";
import axios from "axios";

import { get as LockrGet, set as LockrSet } from "lockr";

const getPlaylistData = (playlist_id) =>
  new Promise((resolve, reject) => {
    if (!LockrGet(playlist_id)) {
      const options = {
        url: process.env.REACT_APP_YTMUSIC_URL + "getPlaylist/" + playlist_id,
        method: "GET",
      };
      axios(options)
        .then((res) => {
          LockrSet(playlist_id, res.data.response);
          resolve(LockrGet(playlist_id));
        })
        .catch((err) => reject(err));
    } else {
      resolve(LockrGet(playlist_id));
    }
  });

export default getPlaylistData;
