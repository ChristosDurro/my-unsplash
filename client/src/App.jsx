import "./App.css";
import Navbar from "./components/global/Navbar";
import Gallery from "./components/Gallery/Gallery";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const fetchURL = "https://my-unsplash-k6qq.onrender.com/images";

  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchImages = () => {
      fetch(fetchURL)
        .then((response) => response.json())
        .then((data) => setImages(data.reverse()))
        .catch((error) => console.log(error));
    };
    fetchImages();
  }, []);

  const filteredImages = images.filter((image) => {
    if (searchValue === "") return image;
    else {
      return (
        image.label.toLowerCase().includes(searchValue) ||
        image.label.includes(searchValue)
      );
    }
  });

  const handleSearchValue = (searchBarValue) => {
    setSearchValue(searchBarValue);
  };

  const handleImagesSet = (imagesAfterDelete) => {
    setImages(imagesAfterDelete);
  };

  const handleAddImage = (newPhoto) => {
    setImages((prevValue) => [newPhoto, ...prevValue]);
  };

  return (
    <div className="container">
      <Navbar
        handleSearchBarValue={handleSearchValue}
        searchBarValue={searchValue}
        handleImageAdding={handleAddImage}
      />
      <Gallery images={filteredImages} setImages={handleImagesSet} />
    </div>
  );
};

export default App;
