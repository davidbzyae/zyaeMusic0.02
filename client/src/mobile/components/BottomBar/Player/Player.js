import React from "react";
import styles from "./player.module.scss";

import MiniLoader from "../../MiniLoader/MiniLoader";
import ProgressiveImg from "../../ProgressiveImg/ProgressiveImg";

import { get as LockrGet, set as LockrSet, rm as LockrRM } from "lockr";

import classNames from "classnames/bind";
import getArtistString from "../../../helpers/getArtistString";
import getCustomImgSize from "../../../helpers/getCustomImgSize";

const audio = new Audio();
const cx = classNames.bind(styles);

const Player = ({ expandFunct, expanded }) => {
  const [songData, setSongData] = React.useState(null);
  const [audioData, setAudioData] = React.useState({
    isSet: false,
    currentTime: null,
    formatTime: null,
  });
  const [loading, setLoading] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [pausePlayActive, setPausePlayActive] = React.useState(false);
  const [skipForwardBtnActive, setSkipForwardBtnActive] = React.useState(false);
  const [skipBackwardBtnActive, setSkipBackwardBtnActive] =
    React.useState(false);

  React.useEffect(() => {
    window.addEventListener("playbackDataChange", () => {
      const song_data = LockrGet("playback_data");
      audio.src =
        process.env.REACT_APP_API_URL + "/tracks/" + song_data.song_id;
      setSongData(song_data);
      audio.play();
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song_data.title,
        artist: getArtistString(song_data.artists),
        artwork: [
          {
            src: getCustomImgSize(song_data.thumbnail, 512, 512),
            sizes: "512x512",
          },
          {
            src: getCustomImgSize(song_data.thumbnail, 384, 384),
            sizes: "384x384",
          },
          {
            src: getCustomImgSize(song_data.thumbnail, 256, 256),
            sizes: "256x256",
          },
          {
            src: getCustomImgSize(song_data.thumbnail, 192, 192),
            sizes: "192x192",
          },
          {
            src: getCustomImgSize(song_data.thumbnail, 128, 128),
            sizes: "128x128",
          },
          {
            src: getCustomImgSize(song_data.thumbnail, 96, 96),
            sizes: "96x96",
          },
        ],
      });
    });
    window.addEventListener("loadingChange", () => {
      setLoading(LockrGet("loading"));
    });
    audio.addEventListener("pause", () => {
      setIsPlaying(false);
      setPausePlayActive(true);
      setTimeout(() => {
        setPausePlayActive(false);
      }, 200);
    });
    audio.addEventListener("play", () => {
      setIsPlaying(true);
      setPausePlayActive(true);
      setTimeout(() => {
        setPausePlayActive(false);
      }, 200);
    });

    const audioUpdater = setInterval(() => {
      if (!audio.paused) {
        function fmtMSS(s) {
          const totalSecs = Math.floor(s);

          const mins = Math.floor(totalSecs / 60);
          const secs = totalSecs % 60;
          const formatSecs = secs >= 10 ? `${secs}` : `0${secs}`;

          const time = `${mins}:${formatSecs}`;
          return time;
        }

        setAudioData({
          isSet: true,
          currentTime: audio.currentTime,
          formatTime: fmtMSS(audio.currentTime),
        });
      }
    }, 1000);
    return () => clearInterval(audioUpdater);
  }, []);

  React.useEffect(() => {
    if (songData) {
      const img = new Image();
      img.src = getCustomImgSize(songData.thumbnail, 1000, 1000);
    }
  }, [songData]);

  return (
    <div
      onClick={(e) => {
        if (songData && e.target.nodeName !== "I") {
          expandFunct();
        }
      }}
      className={cx({ container: true, expanded: expanded })}
    >
      {songData && (
        <div className={cx({ expanded_container: true, display: expanded })}>
          <div className={styles.expanded_content}>
            <div className={styles.tool_bar}>
              <div className={`${styles.tool_item} ${styles.down_arrow}`}>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              <div
                className={`${styles.tool_item} ${styles.playback_collection_name}`}
              >
                Liked Songs
              </div>
              <div className={`${styles.tool_item} ${styles.song_options}`}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>

            <div className={styles.song_content}>
              <div className={styles.thumbnail_container}>
                <img
                  src={getCustomImgSize(songData.thumbnail, 1000, 1000)}
                ></img>
              </div>
              <div className={styles.song_info}>
                <p className={styles.title}>{songData.title}</p>
                <p className={styles.artists}>
                  {getArtistString(songData.artists)}
                </p>
              </div>
              <div className={styles.song_controls}>
                <div className={styles.slider}>
                  <div className={styles.bar}>
                    <div
                      className={styles.bar_filled}
                      style={{
                        width:
                          (audioData.currentTime / audio.duration) * 100 +
                            "%" || "0%",
                      }}
                    >
                      a
                    </div>
                  </div>
                  <p className={`${styles.song_time} ${styles.start}`}>
                    {audioData.formatTime}
                  </p>
                  <p className={`${styles.song_time} ${styles.end}`}>
                    {songData.duration}
                  </p>
                </div>
                <div className={styles.buttons}>
                  <div
                    className={cx({
                      skipBackwardBtn: true,
                      active: skipBackwardBtnActive,
                    })}
                    onClick={() => {
                      setTimeout(() => {
                        // if (isPlaying) setIsPlaying(false);
                        // else setIsPlaying(true);
                      }, 100);
                      setSkipBackwardBtnActive(true);
                      setTimeout(() => {
                        setSkipBackwardBtnActive(false);
                      }, 200);
                    }}
                  >
                    <i className="fa-solid fa-backward-step"></i>
                  </div>
                  {isPlaying ? (
                    <div
                      className={cx({
                        pausePlayButton: true,
                        active: pausePlayActive,
                      })}
                      onClick={() => {
                        setTimeout(() => {
                          if (isPlaying) audio.pause();
                          else audio.play();
                        }, 100);
                        setPausePlayActive(true);
                        setTimeout(() => {
                          setPausePlayActive(false);
                        }, 200);
                      }}
                    >
                      <i className="fa-solid fa-pause"></i>
                    </div>
                  ) : (
                    <div
                      className={cx({
                        pausePlayButton: true,
                        active: pausePlayActive,
                      })}
                      onClick={() => {
                        setTimeout(() => {
                          if (isPlaying) audio.pause();
                          else audio.play();
                        }, 100);
                        setPausePlayActive(true);
                        setTimeout(() => {
                          setPausePlayActive(false);
                        }, 200);
                      }}
                    >
                      <i className="fa-solid fa-play"></i>
                    </div>
                  )}
                  <div
                    className={cx({
                      skipForwardBtn: true,
                      active: skipForwardBtnActive,
                    })}
                    onClick={() => {
                      setTimeout(() => {
                        // if (isPlaying) setIsPlaying(false);
                        // else setIsPlaying(true);
                      }, 100);
                      setSkipForwardBtnActive(true);
                      setTimeout(() => {
                        setSkipForwardBtnActive(false);
                      }, 200);
                    }}
                  >
                    <i className="fa-solid fa-forward-step"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {songData ? (
        <div className={styles.content}>
          <div className={styles.thumbnail_container}>
            <ProgressiveImg
              src={getCustomImgSize(songData.thumbnail, 100, 100)}
            />
          </div>
          <div className={styles.song_info}>
            <p className={styles.song_name}>{songData.title}</p>
            <p className={styles.artist_name}>
              {getArtistString(songData.artists)}
            </p>
          </div>
          <div className={styles.song_controls}>
            {isPlaying ? (
              <div
                className={cx({
                  pausePlayButton: true,
                  active: pausePlayActive,
                })}
                onClick={() => {
                  setTimeout(() => {
                    if (isPlaying) audio.pause();
                    else audio.play();
                  }, 100);
                  setPausePlayActive(true);
                  setTimeout(() => {
                    setPausePlayActive(false);
                  }, 200);
                }}
              >
                <i className="fa-solid fa-pause"></i>
              </div>
            ) : (
              <div
                className={cx({
                  pausePlayButton: true,
                  active: pausePlayActive,
                })}
                onClick={() => {
                  setTimeout(() => {
                    if (isPlaying) audio.pause();
                    else audio.play();
                  }, 100);
                  setPausePlayActive(true);
                  setTimeout(() => {
                    setPausePlayActive(false);
                  }, 200);
                }}
              >
                <i className="fa-solid fa-play"></i>
              </div>
            )}
            {loading ? (
              <div className={styles.miniLoaderContainer}>
                <MiniLoader size={25} />
              </div>
            ) : (
              <div
                className={cx({
                  skipButton: true,
                  active: skipForwardBtnActive,
                })}
                onClick={() => {
                  setTimeout(() => {
                    // if (isPlaying) setIsPlaying(false);
                    // else setIsPlaying(true);
                  }, 100);
                  setSkipForwardBtnActive(true);
                  setTimeout(() => {
                    setSkipForwardBtnActive(false);
                  }, 200);
                }}
              >
                <i className="fa-solid fa-forward-step"></i>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.thumbnail_container}>
            <i className="fa-solid fa-music"></i>
          </div>
          <div className={styles.song_info_frame}>
            <div className={styles.song_name_frame}></div>
            <div className={styles.artist_name_frame}></div>
          </div>
          <div className={styles.song_controls}>
            <i className="fa-solid fa-play"></i>
            {loading ? (
              <div className={styles.miniLoaderContainer}>
                <MiniLoader size={25} />
              </div>
            ) : (
              <i className="fa-solid fa-forward-step"></i>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
