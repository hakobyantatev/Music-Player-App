import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPlus, FaPause } from "react-icons/fa";
import { TbArrowsUpDown } from "react-icons/tb";
import "./PlayAllButton.css";
import { useDispatch, useSelector } from "react-redux";
import { playAll, nextTrack, filterMusics, sortMusics, nullsetCurrentPlaying, setIsplaying } from "../../features/musicsSlice";

export default function PlayAllButton() {
  const dispatch = useDispatch();
  const musics = useSelector((state) => state.musics);
  const audioRef = useRef(null);

  // Handle the audio metadata load event
  const handleLoadedMetadata = () => {
    // Start playing the audio
    audioRef.current.play().catch((error) => {
      console.error("Error playing audio:", error);
    });

    // Remove the event listener after metadata is loaded
    audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
  };

  useEffect(() => {
    // Add event listener for audio metadata load
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // Remove event listener on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [audioRef.current]);

  // Handle the end of the current track
  const handleTrackFinished = async () => {
    // Move to the next track
    dispatch(nextTrack());

    // If there are more tracks to play, load and play the next one
    if (musics.currentlyPlayingIndex !== null && musics.currentlyPlayingIndex < musics.filtered.length) {
      audioRef.current.currentTime = 0;

      try {
        audioRef.current.src = musics.filtered[musics.currentlyPlayingIndex]?.src;
        await new Promise((resolve) => {
          const handleCanPlayThrough = () => {
            resolve();
            audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          };
          audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
        });
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
        audioRef.current.load();
      }
    } else {
      // If no more tracks, stop playing
      dispatch(setIsplaying(false));
    }
  };

  // Handle the click event for the Play All button
  const handleClickPlayAll = async () => {
    // Reset the currently playing index
    dispatch(nullsetCurrentPlaying());

    // Pause all other audio elements on the page
    const allAudioElements = document.querySelectorAll("audio");
    allAudioElements.forEach((audioElement) => {
      audioElement.pause();
    });

    // If music is playing, pause; otherwise, start playing
    if (musics.isPlaying) {
      audioRef.current.pause();
    } else {
      // Start playing all tracks
      dispatch(playAll());
      audioRef.current.currentTime = 0;

      // If there are filtered tracks, play the first one
      if (musics.filtered.length > 0) {
        try {
          await new Promise((resolve) => {
            const handleCanPlayThrough = () => {
              resolve();
              audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
            };
            audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
          });
          await audioRef.current.play();
        } catch (error) {
          console.error('Error playing audio:', error);
          audioRef.current.load();
        }
      } else {
        // Handle the case when there are no filtered tracks
        dispatch(setIsplaying(false));
      }
    }

    // Toggle the play state
    dispatch(setIsplaying());
  };

  // Handle the click event for the Add All button
  const handleClickAdd = () => {
    console.log("Click Add All button");
  };

  // Handle the change event for the filter input
  const handleChange = (e) => {
    dispatch(filterMusics({ title: e.target.value }));
  };

  // Handle the click event for the Sort button
  const handleClickSort = () => {
    dispatch(sortMusics());
  };

  return (
    <div className="PlayAllButton">
      <div className="buttons">
        <div className="left">
          {/* Play All button */}
          <button className="btn" onClick={handleClickPlayAll}>
            {musics.isPlaying ? <FaPause /> : <FaPlay />}
            Play All
          </button>
          {/* Audio element for playback control */}
          <audio
            ref={audioRef}
            src={musics.filtered[musics.currentlyPlayingIndex]?.src}
            onEnded={handleTrackFinished}
          ></audio>
          {/* Add All button */}
          <button className="btn" onClick={handleClickAdd}>
            <FaPlus />
            Add All
          </button>
        </div>
        <div className="right">
          {/* Sort button */}
          <button className="btn" onClick={handleClickSort}>
            <TbArrowsUpDown />
            Track Number
          </button>
          {/* Filter input */}
          <input type="text" placeholder="Filter" className="filter" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
