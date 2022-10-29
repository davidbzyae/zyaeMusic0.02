import React from "react";
import styles from "./artist_slider.module.scss";
import explicIcon from "../../../assets/images/explicit_icon.svg";

// libs
import classNames from "classnames/bind";

// components
import ProgressiveImg from "../ProgressiveImg/ProgressiveImg";

// helpers
import getCustomImgSize from "../../helpers/getCustomImgSize";

const cx = classNames.bind(styles);

const ArtistSlider = ({ artist_array, navigate }) => {
  return (
    <div className={cx({ artist_array: true })}>
      {artist_array.map((artist, i) => {
        return (
          <div
            onClick={() => {
              navigate("/artist/" + artist.browseId);
            }}
            key={artist.browseId}
            className={cx({ artist_entry: true })}
          >
            <ProgressiveImg
              src={getCustomImgSize(artist.thumbnails[0].url, 200, 200)}
            />
            <p>{artist.title || artist.artist}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ArtistSlider;
