import { useDispatch, useSelector } from "react-redux";
import "./MusicUploadForm.css";
import { selectAllMusics, addMusic } from "../../features/musicsSlice";
import { useState, useEffect } from "react";
import classNames from "classnames";

export default function MusicUploadForm() {
  const musics = useSelector(selectAllMusics);
  const [enable, setEnable] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const dispatch = useDispatch();

  // Handle the visual transition after the mock upload process
  useEffect(() => {
    if (uploadProgress >= 100) {
      setTimeout(() => {
        setShowForm(true);
        setUploadProgress(0);
        setEnable(false);
      }, 100);
    }
  }, [uploadProgress]);

  // Handle the form submission
  const handleSumbit = async (e) => {
    e.preventDefault();
    setEnable(false);

    // Destructure form elements
    const [songName, artistName, fileInput] = e.target;
    const file = fileInput.files[0];

    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      // Initialize upload progress
      setUploadProgress(0);
      setShowForm(false);

      // Simulate the upload process
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          const newProgress = prevProgress + 50;
          if (newProgress >= 100) {
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 100);

      // Generate a URL for the uploaded file
      const src = URL.createObjectURL(file);

      // Create a new music object
      const newMusic = {
        id: musics.original.length + 1,
        songName: songName.value,
        artistName: artistName.value,
        trackNumber: musics.original.length + 1,
        src: src,
      };

      // Dispatch action to add new music
      dispatch(addMusic({ newMusic }));

      // Reset the form
      e.target.reset();
    } catch (error) {
      // Handle errors during file processing
      alert("Error processing file:", error);
    }
  };

  return (
    <div className="MusicUploadForm">
      <h1>Add music</h1>
      {showForm ? (
        <form className="form" onSubmit={handleSumbit}>
          <input type="text" placeholder="Enter Song Name" />
          <input type="text" placeholder="Enter Artist Name" />
          <input type="file" accept=".mp3, .wav" onChange={() => setEnable(true)} />
          <input
            type="submit"
            value={"Add Music"}
            disabled={!enable}
            className={classNames({ disable: enable === false })}
          />
        </form>
      ) : (
        <div>
          <p>Uploading...</p>
          {uploadProgress > 0 && (
            <progress value={uploadProgress} max="100">
              {uploadProgress}%
            </progress>
          )}
        </div>
      )}
    </div>
  );
}
