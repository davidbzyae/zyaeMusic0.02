import React, { useEffect } from "react";
import styles from "./browse_page.module.scss";
import explicIcon from "../../../assets/images/explicit_icon.svg";

// libs
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { get as LockrGet, set as LockrSet } from "lockr";

// components
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import SongList from "../../components/SongLists/RegList/RegList";
import MusicSlider from "../../components/MusicSlider/MusicSlider";
import ArtistSlider from "../../components/ArtistSlider/ArtistSlider";
import ProgressiveImg from "../../components/ProgressiveImg/ProgressiveImg";

// functions
import getArtistString from "../../helpers/getArtistString";
import getSearchSuggested from "../../helpers/getSearchSuggested";
import getSearchData from "../../helpers/getSearchData";
import playSong from "../../helpers/playSong";
import axios from "axios";

const cx = classNames.bind(styles);
const BrowsePage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { query } = useParams();

  const inputRef = React.useRef(null);

  const navigate = useNavigate();

  const updateSearchQuery = (update_query) => {
    LockrSet("last_query", update_query);
    setSearchQuery(update_query);
    navigate("/browse/" + update_query);
    if (update_query !== "") {
      handleSearch(update_query);
    }
  };

  useEffect(() => {
    if (query) {
      updateSearchQuery(query);
    } else if (LockrGet("last_query")) {
      updateSearchQuery(LockrGet("last_query"));
    }
  }, [query]);

  const handleSearch = (search_query) => {
    setIsLoading(true);
    setSearchData(null);
    getSearchData(search_query)
      .then((res) => {
        const return_order = [];
        const returnObject = {
          return_order: [],
          top_result: [],
          albums_array: [],
          songs_array: [],
          playlists_array: [],
          artists_array: [],
        };
        res.map((result) => {
          if (result.category == "Top result") {
            returnObject.top_result.push(result);
            return_order.push("top_result");
          } else if (result.category == "Songs") {
            returnObject.songs_array.push(result);
            return_order.push("songs");
          } else if (result.category == "Albums") {
            returnObject.albums_array.push(result);
            return_order.push("albums");
          } else if (result.category == "Community playlists") {
            returnObject.playlists_array.push(result);
            return_order.push("playlists");
          } else if (result.category == "Artists") {
            returnObject.artists_array.push(result);
            return_order.push("artists");
          }
        });
        returnObject.return_order = [...new Set(return_order)];
        setSearchData(returnObject);
        setIsLoading(false);
      })
      .catch((err) => setSearchData(err.response.data));
  };

  return (
    <>
      <div className={styles.search_bar}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
              updateSearchQuery(e.target.value);
            }
          }}
          name="input"
          value={searchQuery}
          autoComplete="off"
          placeholder="Search Zyae"
        />
        <i
          className={`fa-solid fa-circle-xmark ${styles.xmark}`}
          onClick={(e) => {
            inputRef.current.focus();
            updateSearchQuery("");
          }}
        ></i>
      </div>
      <div
        className={
          searchData ? styles.loadedBrowseContent : styles.unloadedBrowseContent
        }
      >
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <SearchContent searchData={searchData} navigate={navigate} />
        )}
      </div>
    </>
  );
};

const SearchContent = ({ searchData, navigate }) => {
  return (
    <>
      {!searchData ? (
        <i
          className={`fa-solid fa-magnifying-glass ${styles.large_music_logo}`}
        ></i>
      ) : (
        <div className={styles.search_results}>
          {searchData.return_order.map((result) => {
            if (
              result == "top_result" &&
              ["playlist", "artist", "song", "album"].indexOf(
                searchData.top_result[0].resultType
              ) > -1
            ) {
              return (
                <div
                  onClick={() => {
                    if (searchData.top_result[0].resultType == "song")
                      playSong(searchData.top_result[0]);
                  }}
                  key={0}
                  className={styles.result}
                >
                  <h2>Top result</h2>
                  <TopResult
                    resultData={searchData.top_result}
                    navigate={navigate}
                  />
                </div>
              );
            } else if (result == "songs" && searchData.songs_array.length > 0) {
              return (
                <div key={1} className={styles.result}>
                  <h2>Songs</h2>
                  <SongList songs_array={searchData.songs_array} />
                </div>
              );
            } else if (
              result == "albums" &&
              searchData.albums_array.length > 0
            ) {
              return (
                <div key={2} className={styles.result}>
                  <h2>Albums</h2>
                  <MusicSlider
                    type="album"
                    music_array={searchData.albums_array}
                    navigate={navigate}
                  />
                </div>
              );
            } else if (result == "playlists") {
              return (
                <div key={3} className={styles.result}>
                  <h2>Playlist</h2>
                  <MusicSlider
                    type="playlist"
                    music_array={searchData.playlists_array}
                    navigate={navigate}
                  />
                </div>
              );
            } else if (
              result == "artists" &&
              searchData.artists_array.length > 0
            ) {
              return (
                <div key={4} className={styles.result}>
                  <h2>Artists</h2>
                  <ArtistSlider
                    artist_array={searchData.artists_array}
                    navigate={navigate}
                  />
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

const TopResult = ({ resultData, navigate }) => {
  const data = resultData[0];

  const InfoComponent = ({ type }) => {
    switch (type) {
      case "artist":
        return (
          <div className={styles.top_result_item}>
            <p className={styles.result_title}>{data.artist}</p>
            <p className={styles.result_sub}>Artist</p>
          </div>
        );
      case "album":
        return (
          <div className={styles.top_result_item}>
            <p className={styles.result_title}>{data.title}</p>
            <p className={styles.result_sub}>
              {data.type} • {getArtistString(data.artists)} • {data.year}
            </p>
          </div>
        );
      case "song":
        return (
          <div className={styles.top_result_item}>
            <p className={styles.result_title}>{data.title}</p>
            <p className={styles.result_sub}>
              Song • {getArtistString(data.artists)} • {data.album.name}
            </p>
          </div>
        );
      case "playlist":
        return (
          <>
            <p className={styles.result_title}>{data.title}</p>
            <p className={styles.result_sub}>
              Playlist • {data.author} • {data.itemCount} songs
            </p>
          </>
        );
    }
  };

  return (
    <div
      key={data.videoId || data.browseId}
      onClick={() => {
        console.log(data);
        const pushSearchItem = {
          item_type: data.resultType,
          youtube_id: data.browseId,
          item_title: data.artist || data.title,
          thumbnail: data.thumbnails[0].url,
          item_subInfo:
            data.type ||
            data.resultType.charAt(0).toUpperCase() + data.resultType.slice(1),
        };
        console.log(pushSearchItem);
        if (data.resultType !== "song")
          navigate(
            "/" + data.resultType + "/" + (data.videoId || data.browseId)
          );
      }}
      className={cx({
        top_result: true,
        artist: data.resultType == "artist",
        album: data.resultType == "album",
        song: data.resultType == "song",
      })}
    >
      <ProgressiveImg src={data.thumbnails[data.thumbnails.length - 1].url} />
      <div className={styles.song_info}>
        <div className={styles.result_info}>
          <InfoComponent type={data.resultType} />
        </div>
      </div>
      <div className={styles.song_options}>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
    </div>
  );
};

export default BrowsePage;
