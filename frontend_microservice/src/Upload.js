import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload() {
    if (file) {
      console.log("Uploading file");
    } else {
      console.log("No file selected");
    }
  }

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Upload a new image!</h2>
      <label htmlFor="file" className="upload-label">
        Choose File
      </label>
      <input type="file" id="file" className="upload-input" />
      <br />
      <br />
      <button className="upload-button">Upload</button>
    </div>
  );
}

export default Upload;
