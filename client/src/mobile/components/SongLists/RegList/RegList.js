import React from "react";
import styles from "./reg_list.module.scss";
import explicIcon from "../../../../assets/images/explicit_icon.svg";

// functions
import getArtistString from "../../../helpers/getArtistString";
import playSong from "../../../helpers/playSong";

// components
import ProgressiveImg from "../../ProgressiveImg/ProgressiveImg";

const SongList = ({ songs_array }) => {
  const getSongData = (id) => {
    var song_data;
    songs_array.forEach((song, i) => {
      if (song.videoId === id) song_data = song;
    });

    if (song_data) playSong(song_data);
    else console.log("Song data not found in array!");
  };

  return (
    <div className={styles.song_list}>
      {songs_array.map((song, i) => {
        return (
          <div key={song.videoId || i}>
            <div
              onClick={() => getSongData(song.videoId)}
              key={song.videoId}
              className={styles.song_list_entry}
            >
              <div className={styles.img_wrapper}>
                <ProgressiveImg
                  src={song.thumbnails[song.thumbnails.length - 1].url}
                />
              </div>
              <div className={styles.song_info}>
                <div className={styles.song_title}>{song.title}</div>
                <div className={styles.song_artists}>
                  {getArtistString(song.artists)}
                  {song.isExplicit && <img src={explicIcon}></img>}
                </div>
              </div>
              <div className={styles.song_options}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            {i + 1 != songs_array.length && (
              <span className={styles.seperator}></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SongList;
