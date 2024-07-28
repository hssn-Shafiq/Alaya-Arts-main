import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import firebaseInstance from '@/services/firebase';
import { CloudUploadOutlined, Loading3QuartersOutlined } from '@ant-design/icons';

const UploadHomeImages = () => {
  const [imageType, setImageType] = useState('home');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImages, setExistingImages] = useState({ homeImageUrl: '', shopImageUrl: '' });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingLoading, setUpdatingLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await firebaseInstance.getBannerImages();
      setExistingImages(data);
    } catch (error) {
      console.error("Error fetching existing images:", error);
    }
  };

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
        setLoading(true);
        const imageUrl = await firebaseInstance.uploadSingleImage(image);
        if (imageType === 'home') {
          await firebaseInstance.storeBannerImages(imageUrl, existingImages.shopImageUrl);
        } else if (imageType === 'shop') {
          await firebaseInstance.storeBannerImages(existingImages.homeImageUrl, imageUrl);
        }
        setMessage("Image uploaded successfully")
        setImage(null);
        setImagePreview(null);
        await fetchImages(); 
      } catch (error) {
        console.error("Error uploading image:", error);
        setMessage('Failed to upload image');
      } finally {
        setLoading(false);
      }
    } else {
      setMessage('Please select an image');
    }
  };

  const handleUpdateImage = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Compress the image
        setUpdatingLoading(true);
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

        setMessage('Image updated successfully');
        await fetchImages(); 
      } catch (error) {
        console.error("Error updating image:", error);
        setMessage('Failed to update image');
      } finally{
        setUpdatingLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
       <div className="loader">
             <h2 className=' order_page_title'>Upload Banner Images</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className="f-title col-sm-12">
          <h3 htmlFor="imageType" className="form-label">Select Image Type</h3>
          </div>
        <div className="col-sm-9">
        <select
            id="imageType"
            className="form-select fs-3 py-2"
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
          >
            <option value="home">Home Image</option>
            <option value="shop">Shop Image</option>
          </select>
        </div>
        <div className="col-sm-3">
        <label className="col-form-label w-100 bg-dark text-light py-2 rounded-4" htmlFor="imageUpload">
          <div className="img_upload_icon d-flex gap-4">
            <CloudUploadOutlined className="fw-bolder fs-1"/> Select Image
          </div>
          <input type="file" 
          className="form-control img_upload_input d-none"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange} ></input>
        </label>
        </div>
        </div>
        <div className="mb-3">
          <div className="col-sm-2">
          {imagePreview && (
            <div className="mt-2 position-relative">
              <img src={imagePreview} alt="Preview" className="img-fluid" style={{ maxWidth: '100%' }} />
              <button type="button" className="btn btn-danger position-absolute top-0 end-0" onClick={handleRemoveImage}>×</button>
            </div>
          )}
          </div>
          
        </div>

        {message && <div className="alert alert-warning mt-2">{message}</div>}
        <button type="submit" className="btn btn-info fw-bold text-light hover"
        disabled={loading}
        > 
          {loading ? "uplading.." : "Upload Image"}</button>
      </form>

      <h2 className="mt-5">Existing Images</h2>
      {updatingLoading && <div className="alert alert-warning mt-2">updating your image..! plz wait</div>}

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
