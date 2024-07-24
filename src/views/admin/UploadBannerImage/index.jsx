// src/components/BannerImageUpload.js
import React, { useState, useEffect, useRef } from 'react';
import firebaseInstance from '@/services/firebase';
import imageCompression from 'browser-image-compression';
import 'bootstrap/dist/css/bootstrap.min.css';

const BannerImageUpload = () => {
  const [collectionName, setCollectionName] = useState('');
  const [displayCollectionName, setDisplayCollectionName] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchExistingImages = async () => {
      if (displayCollectionName) {
        const collectionRef = firebaseInstance.db.collection("BannerImages").doc("Images");
        const collectionDoc = await collectionRef.get();
        if (collectionDoc.exists) {
          setExistingImages(collectionDoc.data()[displayCollectionName] || []);
        } else {
          setExistingImages([]);
        }
      } else {
        setExistingImages([]);
      }
    };

    fetchExistingImages();
  }, [displayCollectionName]);

  const handleCollectionChange = (e) => {
    setCollectionName(e.target.value);
  };

  const handleDisplayCollectionChange = (e) => {
    setDisplayCollectionName(e.target.value);
  };

  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check if the new selection exceeds the limit
    if (images.length + selectedFiles.length > 4) {
      setMessage('You can only upload up to 4 images.');
      return;
    }

    const validImages = [];
    let invalidImageFound = false;

    const validateAndCompressImage = (file) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = async () => {
          if (img.width >= 1920 && img.height >= 1080) {
            try {
              const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
              resolve(compressedFile);
            } catch (error) {
              resolve(file); // If compression fails, use the original file
            }
          } else {
            invalidImageFound = true;
            resolve(null);
          }
        };
        img.src = URL.createObjectURL(file);
      });
    };

    const compressedImages = await Promise.all(selectedFiles.map(file => validateAndCompressImage(file)));
    const finalImages = compressedImages.filter(image => image !== null);
    setImages([...images, ...finalImages]);
    fileInputRef.current.value = null; // Reset file input field

    if (invalidImageFound) {
      setMessage('Some images were not uploaded because they did not meet the size requirement of 1920x1080.');
    } else {
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (images.length !== 4) {
      setMessage('Please select exactly 4 images before uploading.');
      return;
    }
    setLoading(true);
    try {
      await firebaseInstance.addOrUpdateCollectionImages(collectionName, images);
      setImages([]);
      setCollectionName("");
      setMessage('Images uploaded successfully');
      setDisplayCollectionName(collectionName); // Set display collection to the recently uploaded collection
    } catch (error) {
      console.error('Error uploading images:', error);
      setMessage('Failed to upload images');
    }
    setLoading(false);
  };

  const handleDelete = async (index) => {
    setLoading(true);
    try {
      await firebaseInstance.deleteCollectionImage(displayCollectionName, index);
      setExistingImages(existingImages.filter((_, i) => i !== index));
      setMessage('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Failed to delete image');
    }
    setLoading(false);
  };

  const handleUpdate = async (index, newImage) => {
    const validateAndCompressImage = (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = async () => {
          if (img.width >= 1920 && img.height >= 1080) {
            try {
              const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
              resolve(compressedFile);
            } catch (error) {
              resolve(file); // If compression fails, use the original file
            }
          } else {
            reject(new Error('Image does not meet the size requirement of 1920x1080.'));
          }
        };
        img.src = URL.createObjectURL(file);
      });
    };

    setLoading(true);
    try {
      const compressedImage = await validateAndCompressImage(newImage);
      await firebaseInstance.updateCollectionImage(displayCollectionName, index, compressedImage);
      const updatedImages = [...existingImages];
      updatedImages[index] = URL.createObjectURL(compressedImage);
      setExistingImages(updatedImages);
      setMessage('Image updated successfully');
    } catch (error) {
      console.error('Error updating image:', error);
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upload Banner Images</h2>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Select Collection to Upload:</label>
        <div className="col-sm-10">
          <select className="form-select" value={collectionName} onChange={handleCollectionChange}>
            <option value="">Select</option>
            <option value="Kids Collection">Kids Collection</option>
            <option value="Accessories Collection">Accessories Collection</option>
            <option value="UnStiched Collection">UnStiched Collection</option>
          </select>
        </div>
      </div>
      {message && <div className="alert alert-warning mt-2">{message}</div>}
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Upload Images:</label>
        <div className="col-sm-10">
          <input className="form-control" type="file" multiple onChange={handleImageChange} ref={fileInputRef} />
        </div>
      </div>
      {images.length > 0 && (
        <div className="mt-3">
          <h3>Selected Images</h3>
          <div className="d-flex flex-wrap">
            {images.map((image, index) => (
              <div key={index} className="m-2 position-relative">
                <img src={URL.createObjectURL(image)} alt={`Selected ${index}`} className="img-thumbnail" style={{ width: '100px' }} />
                <button className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => setImages(images.filter((_, i) => i !== index))}>
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="btn btn-primary mt-3" onClick={handleUpload} disabled={loading || !collectionName || images.length !== 4}>
        {loading ? 'Uploading...' : 'Upload Images'}
      </button>
      <hr className="my-5" />
      <h3 className="mb-4">View Existing Images</h3>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Select Collection to View:</label>
        <div className="col-sm-10">
          <select className="form-select" value={displayCollectionName} onChange={handleDisplayCollectionChange}>
            <option value="">Select</option>
            <option value="Kids Collection">Kids Collection</option>
            <option value="Accessories Collection">Accessories Collection</option>
            <option value="UnStiched Collection">UnStiched Collection</option>
            {/* Add more collections as needed */}
          </select>
        </div>
      </div>
      {existingImages.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {existingImages.map((image, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={image} alt={`Collection ${displayCollectionName} ${index}`} className="img-thumbnail" style={{ width: '100px' }} />
                  </td>
                  <td>
                    <input className="form-control mb-2" type="file" onChange={(e) => handleUpdate(index, e.target.files[0])} />
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BannerImageUpload;
