import React from "react";
import styles from "./artist_page.module.scss";

// libs
import { useParams, useNavigate } from "react-router-dom";

// functions
import getArtistData from "../../helpers/getArtistData";
import classNames from "classnames/bind";

// components
import SongList from "../../components/SongLists/RegList/RegList";
import MusicSlider from "../../components/MusicSlider/MusicSlider";
import ArtistSlider from "../../components/ArtistSlider/ArtistSlider";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ProgressiveImg from "../../components/ProgressiveImg/ProgressiveImg";

const cx = classNames.bind(styles);

const ArtistPage = () => {
  const { artist_id } = useParams();
  const [artistData, setArtistData] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    getArtistData(artist_id)
      .then((res) => {
        console.log(res);
        setArtistData(res);
      })
      .catch((err) => navigate("/error/500x", { replace: true }));
  }, [artist_id]);

  return (
    <>
      {artistData ? (
        <Content
          artistData={artistData}
          navigate={(url) => {
            setArtistData(null);
            navigate(url);
          }}
        />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

const Content = ({ artistData, navigate }) => {
  const aboutRef = React.useRef(null);
  const [expandAbout, setExpandAbout] = React.useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = React.useState(false);

  React.useEffect(() => {
    if (artistData.thumbnails) {
      const thumbnailLoader = new Image();
      thumbnailLoader.src =
        artistData.thumbnails[artistData.thumbnails.length - 1].url;
      thumbnailLoader.onload = () => setThumbnailLoaded(true);
    }
  }, []);

  return (
    <>
      <div className={styles.artist_main}>
        {artistData.thumbnails ? (
          <div className={styles.artist_img}>
            <div
              className={cx({
                artist_img_frame: true,
                loaded: thumbnailLoaded,
              })}
              style={{
                backgroundImage: `url(${
                  artistData.thumbnails[artistData.thumbnails.length - 1].url
                })`,
              }}
            />
            <div className={styles.artist_img_fade}></div>
          </div>
        ) : (
          <div className={styles.no_profile_icon}>
            <i className={`fa-solid fa-user`}></i>
          </div>
        )}
      </div>
      <div className={styles.artist_sub}>
        <h2 className={styles.artist_title}>{artistData.name}</h2>
        <div className={styles.artist_buttons}>
          <div className={`${styles.artist_button} ${styles.share}`}>
            <p>
              <i className="fa-solid fa-share"></i>{" "}
            </p>
          </div>
          <div className={`${styles.artist_button} ${styles.play}`}>
            <p>
              <i className="fa-solid fa-circle-play"></i>
              Play
            </p>
          </div>
          <div className={`${styles.artist_button} ${styles.add}`}>
            <p>
              <i className="fa-solid fa-fire"></i>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.page_content}>
        {artistData.songs.results && (
          <div className={styles.top_songs}>
            <h2>Top Songs</h2>
            <SongList
              options={{
                type: "reg_list",
              }}
              songs_array={artistData.songs.results}
            />
          </div>
        )}

        {artistData.albums && (
          <div className={styles.artist_albums}>
            <h2>Albums</h2>
            <MusicSlider
              type="album"
              music_array={artistData.albums.results}
              navigate={(url) => navigate(url)}
            />
          </div>
        )}
        {artistData.singles && (
          <div className={styles.artist_albums}>
            <h2>Singles</h2>
            <MusicSlider
              music_array={artistData.singles.results}
              type="album"
              navigate={(url) => navigate(url)}
            />
          </div>
        )}
        {artistData.playlists && (
          <div className={styles.artist_albums}>
            <h2>Playlists</h2>
            <MusicSlider
              type="playlist"
              music_array={artistData.playlists.results}
              navigate={(url) => navigate(url)}
            />
          </div>
        )}
        {artistData.singles && artistData.albums && (
          <div className={styles.view_artist_discography}>
            View Discograpy <i className="fa-solid fa-arrow-right"></i>
          </div>
        )}
        {artistData.related && (
          <div className={styles.related_artists}>
            <h2>Similar to {artistData.name}</h2>
            <ArtistSlider
              artist_array={artistData.related.results}
              navigate={(url) => navigate(url)}
            />
          </div>
        )}
        {artistData.description && (
          <div className={styles.about_artist}>
            <h2>About</h2>
            <p
              ref={aboutRef}
              className={`${styles.about} ${
                expandAbout ? styles.expanded : ""
              }`}
              onClick={() => {
                setExpandAbout((prevState) => {
                  return !prevState;
                });
                setTimeout(() => {
                  aboutRef.current.scrollIntoView({ behavior: "smooth" });
                }, 1);
              }}
            >
              {artistData.description}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtistPage;
