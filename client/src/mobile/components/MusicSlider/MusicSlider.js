import React from "react";
import styles from "./music_slider.module.scss";
import explicIcon from "../../../assets/images/explicit_icon.svg";

// libs
import classNames from "classnames/bind";

// components
import ProgressiveImg from "../ProgressiveImg/ProgressiveImg";

// helpers
import getCustomImgSize from "../../helpers/getCustomImgSize";

const cx = classNames.bind(styles);

const MusicSlider = ({ music_array, type, navigate }) => {
  return (
    <div className={cx({ music_slider: true })}>
      {music_array.map((music, i) => {
        return (
          <div
            key={music.browseId || music.playlistId}
            onClick={() =>
              navigate(`/${type}/` + (music.browseId || music.playlistId))
            }
            className={cx({ music_entry: true })}
          >
            <ProgressiveImg
              src={getCustomImgSize(music.thumbnails[0].url, 200, 200)}
            />

            <div className={cx({ music_info: true })}>
              <p className={cx({ music_title: true })}>{music.title}</p>
              <div className={cx({ music_info_sub: true })}>
                {music.year}
                {music.isExplicit && <img src={explicIcon}></img>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MusicSlider;
