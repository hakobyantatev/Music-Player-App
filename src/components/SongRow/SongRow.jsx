import PropTypes from "prop-types";
import { FaPlay, FaPause } from "react-icons/fa";
import "./SongRow.css";
import { FaHeart, FaCheck, FaShare } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { isPlayingFalse } from "../../features/musicsSlice";

export default function SongRow({ music, onPlay, playing }) {
  const audioRef = useRef(null);
  const [activeHeart, setActiveHeart] = useState(false);
  const [activeCheck, setActiveCheck] = useState(false);
  const [activeShare, setActiveShare] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const dispatch = useDispatch();

  // Handle click events for various icons
  const handleClickIcon = (iconName) => {
    switch (iconName) {
      case "heart":
        setActiveHeart(!activeHeart);
        break;
      case "check":
        setActiveCheck(!activeCheck);
        break;
      case "share":
        setActiveShare(!activeShare);
        break;
      case "dropdown":
        setActiveDropdown(!activeDropdown);
        break;
      default:
        break;
    }
  };

  // Handle click event for the play/pause button
  const handleClick = () => {
    dispatch(isPlayingFalse());
    onPlay();
    if (playing) {
      audioRef.current.pause();
    } else {
      const allAudioElements = document.querySelectorAll("audio");
      allAudioElements.forEach((audioElement) => {
        if (audioElement !== audioRef.current) {
          audioElement.pause();
        }
      });
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Handle the audio playback end event
  const handleAudioEnded = () => {
    setIsAudioEnded(true);
  };

  // Reset the 'isAudioEnded' state when the music source changes
  useEffect(() => {
    setIsAudioEnded(false);
  }, [music.src]);

  return (
    <tr>
      <td>
        {playing && !isAudioEnded ? (
          <FaPause onClick={handleClick} className="pause" />
        ) : (
          <FaPlay className="play" onClick={handleClick} />
        )}
        <audio
          ref={audioRef}
          src={music.src}
          onEnded={handleAudioEnded}
        ></audio>
      </td>
      <td>{music.songName}</td>
      <td>{music.artistName}</td>
      <td>{music.trackNumber}</td>
      <td className="icons">
        <FaHeart
          onClick={() => handleClickIcon("heart")}
          className={classNames({
            active: activeHeart,
          })}
        />
        <FaCheck
          onClick={() => handleClickIcon("check")}
          className={classNames({
            active: activeCheck,
          })}
        />
        <FaShare
          onClick={() => handleClickIcon("share")}
          className={classNames({
            active: activeShare,
          })}
        />
        <IoMdArrowDropdown
          onClick={() => handleClickIcon("dropdown")}
          className={classNames({
            active: activeDropdown,
          })}
        />
      </td>
    </tr>
  );
}

// Define prop types for the SongRow component
SongRow.propTypes = {
  music: PropTypes.shape({
    id: PropTypes.number,
    songName: PropTypes.string,
    artistName: PropTypes.string,
    trackNumber: PropTypes.number,
    src: PropTypes.string,
  }),
  onPlay: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};
