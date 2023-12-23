import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/validate_token", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Since login is true, now fetch data and update state
          // Dummy data for images - fetch it
          const fetchedImageUrls = [
            "https://picsum.photos/200",
            "https://picsum.photos/201",
            "https://picsum.photos/202",
          ];
          setImageUrls(fetchedImageUrls);
        } else {
          navigate("/unauthorized");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        navigate("/");
      }
    };

    // Call the function when the component mounts
    fetchData();
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      <div className="image-container">
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
