import React from "react";
import styles from "./playlist_page.module.scss";

// libs
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";

// functions
import getPlaylistData from "../../helpers/getPlaylistData";
import getArtistString from "../../helpers/getArtistString";

// components
import SongList from "../../components/SongLists/RegList/RegList";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import MusicSlider from "../../components/MusicSlider/MusicSlider";
import ProgressiveImg from "../../components/ProgressiveImg/ProgressiveImg";

const cx = classNames.bind(styles);
const PlaylistPage = () => {
  const navigate = useNavigate();

  const { playlist_id } = useParams();
  const [playlistData, setPlaylistData] = React.useState();

  React.useEffect(() => {
    getPlaylistData(playlist_id)
      .then((res) => {
        setPlaylistData(res);
      })
      .catch((err) => navigate("/error/500x", { replace: true }));
  }, [playlist_id]);

  return (
    <>
      {playlistData ? (
        <Content
          playlistData={playlistData}
          navigate={(url) => {
            setPlaylistData(null);
            navigate(url);
          }}
        />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

const Content = ({ playlistData, navigate }) => {
  const [thumbnailLoaded, setThumbnailLoaded] = React.useState(false);

  React.useEffect(() => {
    const thumbnailLoader = new Image();
    thumbnailLoader.src =
      playlistData.thumbnails[playlistData.thumbnails.length - 1].url;
    thumbnailLoader.onload = () => setThumbnailLoaded(true);
  }, []);

  return (
    <>
      <div className={styles.playlist_main}>
        <div className={styles.playlist_img}>
          <div
            className={cx({
              playlist_img_frame: true,
              loaded: thumbnailLoaded,
            })}
            style={{
              backgroundImage: `url(${
                playlistData.thumbnails[playlistData.thumbnails.length - 1].url
              })`,
            }}
          />
          <div className={styles.playlist_img_fade}></div>
        </div>
      </div>
      <div className={styles.playlist_sub}>
        <h2 className={styles.playlist_title}>{playlistData.title}</h2>
        <p onClick={() => navigate("/artist/" + playlistData.artists[0].id)}>
          {playlistData.type} by {getArtistString([playlistData.author])}
        </p>

        <div className={styles.playlist_buttons}>
          <div className={`${styles.playlist_button} ${styles.share}`}>
            <p>
              <i className="fa-solid fa-share"></i>{" "}
            </p>
          </div>
          <div className={`${styles.playlist_button} ${styles.play}`}>
            <p>
              <i className="fa-solid fa-circle-play"></i>
              Play
            </p>
          </div>
          <div className={`${styles.playlist_button} ${styles.add}`}>
            <p>
              <i className="fa-solid fa-fire"></i>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.page_content}>
        {playlistData.tracks && (
          <div className={styles.playlist_songs}>
            <SongList songs_array={playlistData.tracks} />
          </div>
        )}
        <div className={styles.playlist_info}>
          <p>
            {playlistData.year} • {playlistData.type}
          </p>
          <p>
            {playlistData.trackCount}
            {playlistData.trackCount > 1 ? " songs" : " song"} •{" "}
            {playlistData.duration}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;
