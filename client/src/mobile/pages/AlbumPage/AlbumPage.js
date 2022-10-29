import React from "react";
import styles from "./album_page.module.scss";

// libs
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

// functions
import getAlbumData from "../../helpers/getAlbumData";
import getArtistData from "../../helpers/getArtistData";
import getArtistString from "../../helpers/getArtistString";

// components
import SongList from "../../components/SongLists/AlbumList/AlbumList";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import MusicSlider from "../../components/MusicSlider/MusicSlider";

const cx = classNames.bind(styles);
const AlbumPage = () => {
  const { album_id } = useParams();
  const navigate = useNavigate();
  const [albumData, setAlbumData] = React.useState(null);

  React.useEffect(() => {
    getAlbumData(album_id)
      .then((res) => {
        setAlbumData(res);
      })
      .catch((err) => console.log(err));
  }, [album_id]);

  return (
    <>
      {albumData ? (
        <Content
          albumData={albumData}
          navigate={(url) => {
            setAlbumData(null);
            navigate(url);
          }}
        />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

const Content = ({ albumData, artistData, navigate }) => {
  const [thumbnailLoaded, setThumbnailLoaded] = React.useState(false);

  React.useEffect(() => {
    const thumbnailLoader = new Image();
    thumbnailLoader.src =
      albumData.thumbnails[albumData.thumbnails.length - 1].url;
    thumbnailLoader.onload = () => setThumbnailLoaded(true);
  }, []);

  return (
    <>
      <div className={styles.album_main}>
        <div className={styles.album_img}>
          <div
            className={cx({ album_img_frame: true, loaded: thumbnailLoaded })}
            style={{
              backgroundImage: `url(${
                albumData.thumbnails[albumData.thumbnails.length - 1].url
              })`,
            }}
          />
          <div className={styles.album_img_fade}></div>
        </div>
      </div>
      <div className={styles.album_sub}>
        <h2 className={styles.album_title}>{albumData.title}</h2>
        <p onClick={() => navigate("/artist/" + albumData.artists[0].id)}>
          {albumData.type} by {getArtistString(albumData.artists)}
        </p>

        <div className={styles.album_buttons}>
          <div className={`${styles.album_button} ${styles.share}`}>
            <p>
              <i className="fa-solid fa-share"></i>{" "}
            </p>
          </div>
          <div className={`${styles.album_button} ${styles.play}`}>
            <p>
              <i className="fa-solid fa-circle-play"></i>
              Play
            </p>
          </div>
          <div className={`${styles.album_button} ${styles.add}`}>
            <p>
              <i className="fa-solid fa-fire"></i>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.page_content}>
        {albumData.tracks && (
          <div className={styles.album_songs}>
            <SongList songs_array={albumData.tracks} />
          </div>
        )}
        <div className={styles.album_info}>
          <p>
            {albumData.year} • {albumData.type}
          </p>
          <p>
            {albumData.trackCount}
            {albumData.trackCount > 1 ? " songs" : " song"} •{" "}
            {albumData.duration}
          </p>
        </div>
      </div>
    </>
  );
};

export default AlbumPage;
