import { useDispatch, useSelector } from "react-redux";
import "./SongList.css";
import { selectAllMusics, setCurrentPlaying } from "../../features/musicsSlice";
import SongRow from "../SongRow/SongRow";

export default function SongList() {
  // Retrieve music data from the Redux store
  const musics = useSelector(selectAllMusics);
  const dispatch = useDispatch();

  // Handle the play button click event
  const handlePlay = (id) => {
    dispatch(setCurrentPlaying({ id }));
  };

  return (
    <div className="SongList">
      {/* Display a table for the song list */}
      <table>
        <thead>
          {/* Table header with column names */}
          <tr>
            <th>Play</th>
            <th>Song Name</th>
            <th>Artist Name</th>
            <th>Track</th>
            <th>Icons</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through filtered music list and render each SongRow component */}
          {musics.filtered.map((music) => (
            <SongRow
              key={music.id}
              music={music}
              playing={musics.currentPlaying === music.id}
              onPlay={() => handlePlay(music.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
