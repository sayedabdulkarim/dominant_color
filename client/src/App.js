import React, { useState, useEffect } from "react";
import axios from "axios";

//comonent
import Loader from "./component/Loader";

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
      Authorization: "vzdAVcBEbrZxjsu7ONjLrWkufBHKpL0SQCsJbIU2RE0LtCoZA4NQUjvm", // for reviewing added, move to env
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

  useEffect(() => {
    if (images.length > 0) {
      setIsLoading(true); // Start loading
      Promise.all(images.map((img) => extractColors(img.src.medium)))
        .then(() => setIsLoading(false)) // End loading after all extractions
        .catch((error) => console.error("Error in color extraction", error));
    }
  }, [images]);

  return (
    <div className={"main_wrapper"}>
      <div className={"search_container"}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter"
          autoFocus
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={"items_wrapper"}>
          {images.map((image) => (
            <div key={image.id} className={"item"}>
              {/* <img src={image.src.medium} alt={image.alt} /> */}
              {colors[image.src.medium] && (
                <div
                  className={"item_block"}
                  style={{
                    backgroundColor: colors[image.src.medium],
                  }}
                >
                  {colors[image.src.medium]}
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
