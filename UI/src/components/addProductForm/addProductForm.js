import React, { useState } from 'react';
import './addProduct.css';
import Footer from '../Footer';
import ProductImage from './uploadProductImage';
import { useCallback } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function AddProductForm() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [businessownername, setBusinessownername] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [primaryImage, setPrimaryImage] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [files, setFiles] = useState([]);

  let name = localStorage.getItem('username');

  const handleAddProduct = async () => {
    if (files.length > 0) {
      const product = {
        Business_Name: name,
        Product_Name: productName,
        Price: productPrice,
        Description: productDescription,
        Primary_Image: files[0],
        images: files.map((image) => ({
          url: image,
        })),
      };
      console.log('Request Payload:', product);

      // Make API call to add product
      const response = await fetch('http://localhost:9999/product/newProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(product),
      });

      const responseData = await response.json();
      setPrimaryImage(responseData.primaryImage);
      setSecondaryImages(responseData.secondaryImages);

      if (response.ok) {

        console.log('Product added successfully!');
        Swal.fire({
          title: 'Success',
          text: 'Product added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
         } else {
        console.log('Error adding product!');
     
      }
    }
  };

  const handleImageUploaded = async (selectedFiles) => {
    const newFiles = [...files];
  
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'yxfpskz5');
  
      try {
        const response = await Axios.post(
          'https://api.cloudinary.com/v1_1/djzsyzfre/image/upload',
          formData
        );
  
        const imageUrl = response.data.secure_url;
        newFiles.push(imageUrl);
      } catch (error) {
        console.log('Error uploading image:', error);
      }
    }
  
    setFiles(newFiles);
  };
  

  return (
    <div className="main-wrapper22">
      <div className="container22">
        <div className="product-div22">
        <div className='selected-images'>
          <input type="file" multiple onChange={(event) => handleImageUploaded(event.target.files)} />

          {files.length > 0 && (
            <div className="">
              {files.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="selected-image"
                />
              ))}
            </div>
          )}
</div>
          <div className="product-div-right22">
            <label className="product-label22">Product Name</label>
            <input
              type="text"
              className="product-name22"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label className="product-label22">Product Price</label>
            <input
              type="text"
              className="product-price22"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <p className="product-description22">
              <label className="product-label22">Product Description</label>
              <textarea
                className="product-description-input22"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </p>
            <div className="btn-groups22">
              <button type="button" className="buy-now-btn22" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;


 