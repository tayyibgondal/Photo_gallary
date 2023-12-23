import React from "react";

function Gallery() {
  // Dummy data for images - fetch it
  const imageUrls = [
    "https://picsum.photos/200",
    "https://picsum.photos/201",
    "https://picsum.photos/202",
    "https://picsum.photos/203",
    "https://picsum.photos/204",
    "https://picsum.photos/205",
    "https://picsum.photos/206",
    "https://picsum.photos/207",
    "https://picsum.photos/209",
    "https://picsum.photos/210",
    "https://picsum.photos/212",
    "https://picsum.photos/213",
  ];

  return (
    <div>
      <h2>Gallery</h2>
      <div className="image-container">
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
