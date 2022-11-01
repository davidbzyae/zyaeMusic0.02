import axios from "axios";

import { get as LockrGet, set as LockrSet } from "lockr";

const getArtistData = (artist_id) =>
  new Promise((resolve, reject) => {
    if (!LockrGet(artist_id)) {
      const options = {
        url: process.env.REACT_APP_YTMUSIC_URL + "getArtist/" + artist_id,
        method: "GET",
      };
      axios(options)
        .then((res) => {
          LockrSet(artist_id, res.data.response);
          resolve(LockrGet(artist_id));
        })
        .catch((err) => reject(err));
    } else {
      resolve(LockrGet(artist_id));
    }
  });

export default getArtistData;
