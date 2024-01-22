import { createSlice } from "@reduxjs/toolkit";

// Initial state for the musics slice
const initialUsersValue = {
  original: [
    {
      id: 1,
      songName: "Zhurek Isko Alvarez remix",
      artistName: "Adam",
      trackNumber: 1,
      src: "./Adam – Zhurek Isko Alvarez remix.mp3"
    },
    {
      id: 2,
      songName: "По сути",
      artistName: "Janaga",
      trackNumber: 2,
      src: "./JANAGA – По сути.mp3"
    }
  ],
  filtered: [
    {
      id: 1,
      songName: "Zhurek Isko Alvarez remix",
      artistName: "Adam",
      trackNumber: 1,
      src: "./Adam – Zhurek Isko Alvarez remix.mp3"
    },
    {
      id: 2,
      songName: "По сути",
      artistName: "Janaga",
      trackNumber: 2,
      src: "./JANAGA – По сути.mp3"
    }
  ],
  currentlyPlayingIndex: null,
  currentPlaying: null,
  isPlaying: false
};

// Create a slice for the musics state
const musicSlice = createSlice({
  name: "musics",
  initialState: initialUsersValue,
  reducers: {
    // Reducer for adding new music
    addMusic(state, action) {
      state.original.push(action.payload.newMusic);
      state.filtered = state.original;
    },
    // Reducer for sorting musics
    sortMusics(state) {
      if (state.original[0].trackNumber === 1) {
        state.original.sort((a, b) => b.trackNumber - a.trackNumber);
        state.filtered = state.original;
      } else {
        state.original.sort((a, b) => a.trackNumber - b.trackNumber);
        state.filtered = state.original;
      }
    },
    // Reducer for filtering musics
    filterMusics(state, action) {
      const filteredMusics = state.original.filter(
        (elem) =>
          elem.songName.toLowerCase().includes(action.payload.title.toLowerCase()) ||
          elem.artistName.toLowerCase().includes(action.payload.title.toLowerCase())
      );
      state.filtered = filteredMusics;
    },
    // Reducer for playing all musics
    playAll(state) {
      state.currentlyPlayingIndex = 0;
    },
    // Reducer for moving to the next track
    nextTrack(state) {
      if (state.currentlyPlayingIndex !== null && state.currentlyPlayingIndex < state.filtered.length - 1) {
        state.currentlyPlayingIndex += 1;
      }
    },
    // Reducer for setting the current playing music
    setCurrentPlaying(state, action) {
      if (state.currentPlaying === action.payload.id) {
        state.currentPlaying = null;
      } else {
        state.currentPlaying = action.payload.id;
      }
    },
    // Reducer for setting currentPlaying to null
    nullsetCurrentPlaying(state) {
      state.currentPlaying = null;
    },
    // Reducer for setting isPlaying to false
    isPlayingFalse(state) {
      state.isPlaying = false;
    },
    // Reducer for toggling isPlaying
    setIsplaying(state) {
      state.isPlaying = !state.isPlaying;
    }
  },
});

// Selector function to get all music state
export const selectAllMusics = (state) => state.musics;

// Export the reducer and actions
export default musicSlice.reducer;
export const { addMusic, sortMusics, filterMusics, playAll, nextTrack, setCurrentPlaying, nullsetCurrentPlaying, isPlayingFalse, setIsplaying } = musicSlice.actions;
