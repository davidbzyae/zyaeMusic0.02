import React from "react";
import styles from "./album_list.module.scss";
import explicIcon from "../../../../assets/images/explicit_icon.svg";

// libs
import classNames from "classnames/bind";

// functions
import getArtistString from "../../../helpers/getArtistString";
import playSong from "../../../helpers/playSong";

const cx = classNames.bind(styles);

const AlbumList = ({ songs_array }) => {
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
          <div
            key={song.videoId || i}
            className={cx({ unavailable: !song.videoId })}
          >
            <div
              onClick={() => getSongData(song.videoId)}
              key={song.videoId}
              className={styles.song_list_entry}
            >
              <p>{i + 1}</p>
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

export default AlbumList;
