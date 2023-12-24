import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3003/validate_token", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);

          const imagesResponse = await fetch("http://localhost:3001/images", {
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
      const deleteResponse = await fetch(
        `http://localhost:3001/remove/${imageId}/${public_id}/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );

      if (deleteResponse.ok) {
        const updatedImages = imageUrls.filter(
          (image) => image._id !== imageId
        );
        setImageUrls(updatedImages);
      } else {
        console.error("Error deleting image:", deleteResponse.statusText);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  return (
    <div className="gallery-container">
      <h2>Gallery</h2>
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

export default Gallery;
