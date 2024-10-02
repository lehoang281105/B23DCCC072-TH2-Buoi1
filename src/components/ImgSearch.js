import React, { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const searchImages = () => {
    const API_URL = `https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${query.trim()}&image_type=photo`;

    axios
      .get(API_URL)
      .then((res) => {
        setImages(res.data.hits);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Tìm kiếm hình ảnh</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nhập từ khóa"
      />
      <button onClick={searchImages}>Tìm</button>
      <div>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            style={{ width: "100px", height: "100px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
