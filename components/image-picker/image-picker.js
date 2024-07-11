"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

export default function ImagePicker({ name = "", label = "" }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef();

  const handlePickButtonClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setSelectedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!selectedImage && <p>No image selected yet.</p>}
          {selectedImage && (
            <Image src={selectedImage} alt="Image selected by user." fill />
          )}
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id={name}
          name={name}
          ref={inputRef}
          onChange={handleInputChange}
          onFocusCapture={null}
          className={classes.input}
        />
        <button
          type="button"
          onClick={handlePickButtonClick}
          className={classes.button}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
