import React from "react";
import axios from "axios";

import { get as LockrGet, set as LockrSet, rm as LockrRM } from "lockr";

const playSong = (song_data) => {
  const song_id = song_data.videoId;

  const config = {
    url: process.env.REACT_APP_API_URL + "db/musicData/" + song_id,
    method: "GET",
  };
  axios(config)
    .then((res) => {
      if (res.data.response === "Song not found") loadSong();
      else audioMount(res.data.response);
    })
    .catch((err) => {
      if (err.response.data.response == "Song not found") loadSong();
      else console.log(err);
    });

  const loadSong = () => {
    LockrSet("loading", true);
    window.dispatchEvent(new Event("loadingChange"));
    const config = {
      url: process.env.REACT_APP_API_URL + "/tracks/loadSong/",
      method: "POST",
      data: {
        song_data: song_data,
      },
    };
    axios(config)
      .then((res) => {
        audioMount(res.data.response);
        LockrSet("loading", false);
        window.dispatchEvent(new Event("loadingChange"));
      })
      .catch((err) => {
        LockrSet("loading", false);
        window.dispatchEvent(new Event("loadingChange"));
      });
  };

  const audioMount = (song_data) => {
    LockrSet("playback_data", song_data);
    console.log(song_data);
    window.dispatchEvent(new Event("playbackDataChange"));
  };
};

export default playSong;
