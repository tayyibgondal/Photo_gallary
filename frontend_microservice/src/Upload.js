import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();

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

  useEffect(() => {
    const apiUrl = "http://localhost:4000/validate_token";
    const authToken = localStorage.getItem("authToken");

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => {
        return response.json(); // Assuming the server returns JSON
      })
      .then((data) => {
        if (data.userId) {
          setIsLoggedIn(true);
        } else {
          navigator("/unauthorized");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <div className="upload-container">
          <h2 className="upload-heading">Upload a new image!</h2>
          <form action="" onSubmit={handleUpload}>
            <label htmlFor="file" className="upload-label">
              Choose File
            </label>
            <input type="file" id="file" className="upload-input" />
            <br />
            <button className="upload-button">Upload</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Upload;
