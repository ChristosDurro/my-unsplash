import React, { useState } from "react";
import "./Gallery.css";
import { Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import { useEffect } from "react";

const Gallery = (props) => {
  const [images, setImages] = useState([]);
  const url = "http://localhost:8000/delete";

  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  const handleDelete = (e) => {
    axios
      .delete(`${url}/${e.target.id}`)
      .then((res) => {
        const imagesAfterDelete = images.filter(
          (image) => image._id !== res.data
        );
        setImages(imagesAfterDelete);
        props.setImages(imagesAfterDelete);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box className="display-container">
      {images.length === 0 ? (
        <p className="no-img">Such an Image Doesn't Exist!</p>
      ) : (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
        >
          {images.map((image, index) => {
            return (
              <div className="grid-item" key={index}>
                <img className="img" src={image.image} alt={image.label} />
                <div className="overlay">
                  <button
                    id={image._id}
                    className="delete"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <p className="overlay-text">{image.label}</p>
                </div>
              </div>
            );
          })}
        </Masonry>
      )}
    </Box>
  );
};

export default Gallery;
