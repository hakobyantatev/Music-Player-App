import "./App.css"
import MusicUploadForm from "./components/MusicUploadForm/MusicUploadForm"
import PlayAllButton from "./components/PlayAllButton/PlayAllButton"
import SongList from "./components/SongList/SongList"

export default function App() {
  return (
    <div className="App">
      <h1>Music Player</h1>
      <PlayAllButton />
      <SongList/>
      <MusicUploadForm />
    </div>
  )
}
