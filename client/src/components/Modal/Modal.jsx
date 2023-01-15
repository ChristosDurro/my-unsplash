import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

const Modal = ({ closeModal, addImage }) => {
  const [image, setImage] = useState({
    label: "",
    image: "",
  });
  const postURL = "http://localhost:8000/add";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setImage((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .post(postURL, image)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    addImage(image);
    closeModal();
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <p className="add-header">Add a new photo</p>
        <div className="group">
          <label htmlFor="label">Label</label>
          <input
            type="text"
            id="label"
            name="label"
            value={image.label}
            placeholder="Image Label"
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <label htmlFor="url">Photo URL</label>
          <input
            type="text"
            id="url"
            name="image"
            value={image.image}
            placeholder="Photo URL"
            onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <p className="cancel" onClick={() => closeModal(false)}>
            Cancel
          </p>
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
