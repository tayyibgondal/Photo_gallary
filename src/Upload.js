import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);
  const [bandwidthQuota, setBandwidthQuota] = useState(null);
  const [storageQuota, setStorageQuota] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileSelected(true);
  }

  function handleUpload(e) {
    e.preventDefault();
    const storageUrl = process.env.REACT_APP_STORAGE_SERVICE + "/upload/";

    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();

    formData.append("image", file);
    formData.append("userId", userId);

    if (file == null) {
      setMessage("Please select a file!");
      // Set a timeout to clear the message after 4 seconds
      setTimeout(() => {
        setMessage(null);
      }, 4000);
      return;
    }

    fetch(storageUrl, {
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
          // Set a timeout to clear the message after 4 seconds
          setTimeout(() => {
            setMessage(null);
          }, 4000);
          return;
        }
      })
      .catch((error) => {
        setMessage("Jani ap ki bandwidth/storage exceed ho gai hai...");
        // Set a timeout to clear the message after 4 seconds
        setTimeout(() => {
          setMessage(null);
        }, 4000);
        return;
      });
  }

  useEffect(() => {
    const authApiUrl = process.env.REACT_APP_AUTH_SERVICE + "/validate_token";
    const authToken = localStorage.getItem("authToken");

    fetch(authApiUrl, {
      method: "GET",
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => {
        return response.json(); // Assuming the server returns JSON
      })
      .then((data) => {
        console.log(data);
        if (data.userId) {
          setUserId(data.userId);
          setBandwidthQuota(
            Math.round((25 - data.user.bandwidthQuota) * 100) / 100
          );
          setStorageQuota(
            Math.round((10 - data.user.storageQuota) * 100) / 100
          );
          setIsLoggedIn(true);
        } else {
          navigator("/unauthorized");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  }, [message]);

  return (
    <div className="my-component">
      <div>
        <div className="upload-success-message">{message}</div>
        <div>Bandwidth remaining: {bandwidthQuota} MBs</div>
        <div>Storage Quota remaining: {storageQuota} MBs</div>
      </div>
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
            {fileSelected && (
              <p className="file-selected-indicator">
                File selected: {file.name}
              </p>
            )}
            <br />
            <button className="upload-button">Upload</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Upload;
