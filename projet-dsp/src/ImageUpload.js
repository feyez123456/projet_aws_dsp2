import React, { useState } from 'react';

function ImageUpload({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadClick = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div className="image-upload">
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default ImageUpload;