Music Player App

Overview
The Music Player App is a simple web application that allows users to upload, play, and manage a collection of music tracks. Users can add new music, play all tracks, filter and sort them, and interact with individual songs.

Component Structure
The application is structured into several components:

store.js: Manages the application state using Redux Toolkit and defines the store configuration.

musicsSlice.js: Implements the Redux slice for managing music-related state, including adding, sorting, and filtering music tracks.

App.jsx: The main component rendering the core structure of the application, including PlayAllButton, SongList, and MusicUploadForm.

Components:
MusicUploadForm.jsx: Handles the form for uploading new music tracks.
PlayAllButton.jsx: Provides controls for playing, pausing, and managing the music playback.
SongList.jsx: Displays the list of music tracks with options for sorting and filtering.
SongRow.jsx: Represents a single row in the song list with play controls and additional icons.

State Management Approach
The application uses Redux Toolkit for state management. The musicsSlice defines the initial state, actions, and reducers for managing music-related state, such as the list of tracks, current playing track, and playback status.

How to Run Locally
1.Clone the repository:
git clone https://github.com/hakobyantatev/Music-Player-App.git

2.Install dependencies:
npm install

3.Start the application:
npm run dev