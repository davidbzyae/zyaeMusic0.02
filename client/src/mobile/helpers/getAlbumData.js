import React from "react";
import axios from "axios";

import { get as LockrGet, set as LockrSet } from "lockr";

const getAlbumData = (album_id) =>
  new Promise((resolve, reject) => {
    if (!LockrGet(album_id)) {
      const options = {
        url: process.env.REACT_APP_YTMUSIC_URL + "getAlbum/" + album_id,
        method: "GET",
      };
      axios(options)
        .then((res) => {
          LockrSet(album_id, res.data.response);
          resolve(LockrGet(album_id));
        })
        .catch((err) => reject(err));
    } else {
      resolve(LockrGet(album_id));
    }
  });

export default getAlbumData;
