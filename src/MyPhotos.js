import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPhotos() {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authApiUrl =
          process.env.REACT_APP_AUTH_SERVICE + "/validate_token";
        const response = await fetch(authApiUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);

          const storageUrl =
            process.env.REACT_APP_STORAGE_SERVICE + "/images/" + data.userId;
          const imagesResponse = await fetch(storageUrl, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json();
            setImageUrls(imagesData);
          }
        } else {
          navigate("/unauthorized");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (imageId, public_id) => {
    try {
      const storageUrl =
        process.env.REACT_APP_STORAGE_SERVICE +
        "/remove/" +
        imageId +
        "/" +
        public_id +
        "/" +
        userId;
      console.log(storageUrl);
      const deleteResponse = await fetch(storageUrl, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });

      if (deleteResponse.ok) {
        const updatedImages = imageUrls.filter(
          (image) => image._id !== imageId
        );
        setImageUrls(updatedImages);
      } else {
        console.log(deleteResponse.status);
        setMessage(
          "You can't make more delete requests until tomorrow, bandwidth quota exceeded for today!"
        );
        // Set a timeout to clear the message after 4 seconds
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const storageUrl =
        process.env.REACT_APP_STORAGE_SERVICE + "/removeAll/" + userId;

      const deleteAllResponse = await fetch(storageUrl, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });

      if (deleteAllResponse.ok) {
        setImageUrls([]);
        // Optionally, you can show a message that all photos are deleted.
        setMessage("All photos deleted successfully!");
        // Set a timeout to clear the message after 4 seconds
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      } else if (deleteAllResponse.status === 400) {
        setMessage(
          "You can't make more delete requests until tomorrow, bandwidth quota exceeded for today!"
        );
        // Set a timeout to clear the message after 4 seconds
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      } else {
        setMessage("You have already deleted your photos!");
        // Set a timeout to clear the message after 4 seconds
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      }
    } catch (error) {
      console.error("Error during delete all photos:", error);
    }
  };

  return (
    <div className="gallery-container">
      <div className="sub-head">
        <h2 className="p-h">Your Photos</h2>
        <div>
          <button className="delete-all-button" onClick={handleDeleteAll}>
            Delete All Photos
          </button>
        </div>
      </div>
      <div>{message}</div>
      <div className="image-container">
        {imageUrls.map((imageUrl) => (
          <div key={imageUrl._id} className="image-wrapper">
            <img
              src={imageUrl.imageUrl}
              alt={`Image ${imageUrl._id}`}
              className="gallery-image"
            />
            <button
              className="delete-button"
              onClick={() => handleDelete(imageUrl._id, imageUrl.public_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPhotos;
