import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  function handleUpload(e) {
    e.preventDefault();
    const apiUrl = "http://localhost:3001/upload";
    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();

    formData.append("image", file);
    formData.append("userId", userId);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: authToken,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the server returns JSON
      })
      .then((data) => {
        // Handle the response from the server
        if (data.url) {
          setMessage("Image upload successful");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  }

  useEffect(() => {
    const apiUrl = "http://localhost:3003/validate_token";
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
          setUserId(data.userId);
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
      <div>{message}</div>
      {isLoggedIn && (
        <div className="upload-container">
          <h2 className="upload-heading">Upload a new image!</h2>
          <form action="" onSubmit={handleUpload} encType="multipart/form-data">
            <label htmlFor="file" className="upload-label">
              Choose File
            </label>
            <input
              type="file"
              id="file"
              name="image"
              className="upload-input"
              onChange={handleFileChange}
            />
            <br />
            <button className="upload-button">Upload</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Upload;
