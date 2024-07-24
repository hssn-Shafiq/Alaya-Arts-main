import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import firebaseInstance from '@/services/firebase';

const UploadHomeImages = () => {
  const [imageType, setImageType] = useState('home');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImages, setExistingImages] = useState({ homeImageUrl: '', shopImageUrl: '' });

  useEffect(() => {
    // Fetch existing images on component mount
    const fetchImages = async () => {
      try {
        const data = await firebaseInstance.getBannerImages();
        setExistingImages(data);
      } catch (error) {
        console.error("Error fetching existing images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: false, // Use the main thread for simplicity
        });

        // Set image and preview
        setImage(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error('Image compression failed', error);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      try {
        const imageUrl = await firebaseInstance.uploadSingleImage(image);
        if (imageType === 'home') {
          await firebaseInstance.storeBannerImages(imageUrl, existingImages.shopImageUrl);
        } else if (imageType === 'shop') {
          await firebaseInstance.storeBannerImages(existingImages.homeImageUrl, imageUrl);
        }

        alert('Image uploaded successfully');
        setImage(null);
        setImagePreview(null);
        await fetchImages(); 
      } catch (error) {
        console.error("Error uploading image:", error);
        alert('Failed to upload image');
      }
    } else {
      alert('Please select an image');
    }
  };

  const handleUpdateImage = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: false,
        });

        // Upload the compressed image
        const imageUrl = await firebaseInstance.uploadSingleImage(compressedFile);

        // Update the existing images based on type
        if (type === 'home') {
          await firebaseInstance.storeBannerImages(imageUrl, existingImages.shopImageUrl);
        } else if (type === 'shop') {
          await firebaseInstance.storeBannerImages(existingImages.homeImageUrl, imageUrl);
        }

        alert('Image updated successfully');
        await fetchImages(); 
      } catch (error) {
        console.error("Error updating image:", error);
        alert('Failed to update image');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Banner Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imageType" className="form-label">Select Image Type</label>
          <select
            id="imageType"
            className="form-select"
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
          >
            <option value="home">Home Image</option>
            <option value="shop">Shop Image</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2 position-relative">
              <img src={imagePreview} alt="Preview" className="img-fluid" style={{ maxWidth: '200px' }} />
              <button type="button" className="btn btn-danger position-absolute top-0 end-0" onClick={handleRemoveImage}>×</button>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">Upload Image</button>
      </form>

      <h2 className="mt-5">Existing Images</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {existingImages.homeImageUrl && (
            <tr>
              <td>Home Image</td>
              <td>
                <img src={existingImages.homeImageUrl} alt="Home Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'home')}
                />
              </td>
            </tr>
          )}
          {existingImages.shopImageUrl && (
            <tr>
              <td>Shop Image</td>
              <td>
                <img src={existingImages.shopImageUrl} alt="Shop Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'shop')}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UploadHomeImages;
