// src/components/UploadHomeImages.js

import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import firebaseInstance from '@/services/firebase';
import { CloudUploadOutlined } from '@ant-design/icons';

const UploadHomeImages = () => {
  const [imageType, setImageType] = useState('home');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImages, setExistingImages] = useState({
    homeImageUrl: '',
    shopImageUrl: '',
    pretImageUrl: '',
    pretSummerImageUrl: '',
    pretWinterImageUrl: '',
    unstichedSummerImageUrl: '',
    unstichedWinterImageUrl: '',
    kidsSummerImageUrl: '',
    kidsWinterImageUrl: ''
  });
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
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: false,
        });

        setImage(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
        setMessage("");
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
        const updatedImages = { ...existingImages };

        updatedImages[`${imageType}ImageUrl`] = imageUrl;

        await firebaseInstance.storeBannerImages(updatedImages);
        setMessage("Image uploaded successfully");
        setImage(null);
        setImagePreview(null);
        await fetchImages();
      } catch (error) {
        console.error("Error uploading image:", error);
        setMessage('Failed to upload image');
      } finally {
        setLoading(false);

        setTimeout(() => {
          setMessage("");
        },1000)
      }
    } else {
      setMessage('Please select an image');
    }
  };

  const handleUpdateImage = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUpdatingLoading(true);
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: false,
        });

        const imageUrl = await firebaseInstance.uploadSingleImage(compressedFile);
        const updatedImages = { ...existingImages };

        updatedImages[`${type}ImageUrl`] = imageUrl;

        await firebaseInstance.storeBannerImages(updatedImages);
        setMessage('Image updated successfully');
        await fetchImages();
      } catch (error) {
        console.error("Error updating image:", error);
        setMessage('Failed to update image');
      } finally {
        setUpdatingLoading(false);

        setTimeout(() => {
          setMessage("");
        },1000)
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="loader">
        <h2 className='order_page_title'>Upload Banner Images</h2>
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
              <option value="pret">Pret Image</option>
              <option value="pretSummer">Pret Summer Image</option>
              <option value="pretWinter">Pret Winter Image</option>
              <option value="unstichedSummer">Unstiched Summer Image</option>
              <option value="unstichedWinter">Unstiched Winter Image</option>
              <option value="kidsSummer">Kids Summer Image</option>
              <option value="kidsWinter">Kids Winter Image</option>
            </select>
          </div>
          <div className="col-sm-3">
            <label className="col-form-label w-100 bg-dark text-light py-2 rounded-4" htmlFor="imageUpload">
              <div className="img_upload_icon d-flex gap-4">
                <CloudUploadOutlined className="fw-bolder fs-1" /> Select Image
              </div>
              <input
                type="file"
                className="form-control img_upload_input d-none"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
              />
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
        <button type="submit" className="btn btn-info fw-bold text-light hover" disabled={loading}>
          {loading ? "Uploading.." : "Upload Image"}
        </button>
      </form>

      <h2 className="mt-5">Existing Images</h2>
      {updatingLoading && <div className="alert alert-warning mt-2">Updating your image..! Please wait</div>}

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
          {existingImages.pretImageUrl && (
            <tr>
              <td>Pret Image</td>
              <td>
                <img src={existingImages.pretImageUrl} alt="Pret Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'pret')}
                />
              </td>
            </tr>
          )}
          {existingImages.pretSummerImageUrl && (
            <tr>
              <td>Pret Summer Image</td>
              <td>
                <img src={existingImages.pretSummerImageUrl} alt="Pret Summer Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'pretSummer')}
                />
              </td>
            </tr>
          )}
          {existingImages.pretWinterImageUrl && (
            <tr>
              <td>Pret Winter Image</td>
              <td>
                <img src={existingImages.pretWinterImageUrl} alt="Pret Winter Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'pretWinter')}
                />
              </td>
            </tr>
          )}
          {existingImages.unstichedSummerImageUrl && (
            <tr>
              <td>Unstiched Summer Image</td>
              <td>
                <img src={existingImages.unstichedSummerImageUrl} alt="Unstiched Summer Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'unstichedSummer')}
                />
              </td>
            </tr>
          )}
          {existingImages.unstichedWinterImageUrl && (
            <tr>
              <td>Unstiched Winter Image</td>
              <td>
                <img src={existingImages.unstichedWinterImageUrl} alt="Unstiched Winter Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'unstichedWinter')}
                />
              </td>
            </tr>
          )}
          {existingImages.kidsSummerImageUrl && (
            <tr>
              <td>Kids Summer Image</td>
              <td>
                <img src={existingImages.kidsSummerImageUrl} alt="Kids Summer Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'kidsSummer')}
                />
              </td>
            </tr>
          )}
          {existingImages.kidsWinterImageUrl && (
            <tr>
              <td>Kids Winter Image</td>
              <td>
                <img src={existingImages.kidsWinterImageUrl} alt="Kids Winter Banner" className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleUpdateImage(e, 'kidsWinter')}
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
