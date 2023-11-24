import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageColorExtractor = () => {
  //state
  const [input, setInput] = useState("");
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState({}); // To store dominant colors
  const [isLoading, setIsLoading] = useState(false); //loader

  //func
  const fetchImages = async () => {
    setIsLoading(true);
    const headers = {
      Authorization: "vzdAVcBEbrZxjsu7ONjLrWkufBHKpL0SQCsJbIU2RE0LtCoZA4NQUjvm",
    };

    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${input}&per_page=5`,
        { headers }
      );
      setImages(response.data.photos);
      // Reset colors when new images are fetched
      setColors({});
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching images", error);
    }
  };

  const extractColors = async (imageUrl) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/getExtractColor",
        { imageUrl }
      );
      const color = response.data.color;
      setColors((prevColors) => ({
        ...prevColors,
        [imageUrl]: color,
      }));
    } catch (error) {
      console.error("Error extracting color", error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    fetchImages();
  };

  //async
  // useEffect(() => {
  //   images.forEach((img) => {
  //     extractColors(img.src.medium);
  //   });
  // }, [images]);

  useEffect(() => {
    if (images.length > 0) {
      setIsLoading(true); // Start loading
      Promise.all(images.map((img) => extractColors(img.src.medium)))
        .then(() => setIsLoading(false)) // End loading after all extractions
        .catch((error) => console.error("Error in color extraction", error));
    }
  }, [images]);

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <button
        onClick={() =>
          console.log({
            images,
            colors,
          })
        }
      >
        Data
      </button>

      {isLoading ? (
        "Loading"
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            border: "1px solid green",
          }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              style={{
                width: "24%",
                border: "1px solid red",
              }}
            >
              {/* <img src={image.src.medium} alt={image.alt} /> */}
              {colors[image.src.medium] && (
                <div
                  style={{
                    backgroundColor: colors[image.src.medium],
                    color: "white",
                    height: "100px",
                  }}
                >
                  Dominant Color: {colors[image.src.medium]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageColorExtractor;
