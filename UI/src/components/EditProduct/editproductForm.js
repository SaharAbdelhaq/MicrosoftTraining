import './editProduct.css';
import ProductImage from './ProductImage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageUploader from './component/index.js';
import Swal from 'sweetalert2';

function EditProductForm() {
  const [Product_Name, setProductName] = useState('');
  const [Price, setPrice] = useState('');
  const [Description, setDescription] = useState('');
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]); 
  const [Image_ID,setImage_ID]=useState([]);
  const [primary,setPrimary]=useState('');
  const [mapImages,setmapImages]=useState(new Map());
  const[newImages,setNewImages]=useState([]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:9999/product/productByID/` + id, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        const { data } = response;
        setProductName(data.info[0].Product_Name);
        setPrice(data.info[0].Price);
        setDescription(data.info[0].Description);
        setImageUrl(data.imagesURL.map((image) => image.Image_URL));
        setImage_ID(data.imagesURL.map((images) => images.Image_ID));
        const map = new Map();
        data.imagesURL.forEach(item => {
          map.set(item.Image_URL, item.Image_ID);   
        });
        setmapImages(map)
        setDeletedImageIds([]); // Reset the deletedImageIds state
        setPrimary(data.info[0].Primary_Image);
        console.log("body");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedImageUrls = [...imageUrl];
    const images = updatedImageUrls.map((url) => ({ url })); // Include all the images in the updatedImageUrls array
    const delete_Imgs = deletedImageIds;
  
    // Remove the deleted images from the updatedImageUrls array
    const filteredImageUrls = updatedImageUrls.filter((_, index) => !deletedImageIds.includes(Image_ID[index]));
  
    const payload = {
      Product_Name,
      Price,
      Description,
      Primary_Image:primary, // Assuming the first image is the primary image
      delete_Imgs,
      images: newImages, 
    };
    console.log("data");
        console.log(payload);
  
    axios
      .put(`http://localhost:9999/product/editProductData/` + id, payload, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        console.log("data");
        console.log(payload);
        Swal.fire({
          title: 'Success',
          text: 'Product Edited successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  
  
  
  
  

  const handleImageChange = (event) => {
    const files = event.target.files;
    const updatedImageUrls = [...imageUrl];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  

  
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  
  
  const handleImageDelete = (index) => {
    console.log("index");
    console.log(index);
    console.log(mapImages.get(index));
    const updatedImageUrls = [...imageUrl];
    //const deletedImageId = Image_ID[index]; 
    setImageUrl(updatedImageUrls.filter((_, i) => i !== index));
    setDeletedImageIds((prevDeletedImageIds) => [
      ...prevDeletedImageIds,
      mapImages.get(index),
    ]);
    console.log("Deleted Image ID:", mapImages.get(index));
  };
  // const handleImageDelete = (index) => {
  //   const updatedImageUrls = [...imageUrl];
  //   const deletedImageId = Image_ID[index];
  //   updatedImageUrls.splice(index, 1); // Remove the image URL at the specified index
  //   setImageUrl(updatedImageUrls); // Update the imageUrl state
  
  //   const updatedMapImages = new Map(mapImages); // Create a copy of the map
  //   updatedMapImages.delete(updatedImageUrls[index]); // Remove the image URL from the map
  //   setmapImages(updatedMapImages); // Update the mapImages state
  //   console.log("index");
  //   console.log();
  //   setDeletedImageIds((prevDeletedImageIds) => [
  //     ...prevDeletedImageIds,
  //     deletedImageId,
  //   ]);
  // };
  
  
  
  
  const handleImageUpload = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "yxfpskz5");
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djzsyzfre/image/upload",
        formData
      );
  
      const imageUrl = response.data.secure_url;
      setNewImages(imageUrl);
      console.log("imageUrl");
      console.log(imageUrl);
      setImageUrl((prevImageUrl) => [...prevImageUrl, imageUrl]); // Append the new image URL to the existing array
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };
  
  

  return (
    <div className="main-wrapper">
      <div className="container1">
        <div className="product-div">
          <div className='imagesUploader'>
            <input
              type='file'
              onChange={(event) => {
                handleImageUpload(event.target.files);
                handleImageChange(event);
              }}
            />
            {imageUrl.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={imageUrl}
                  alt={`Product ${imageUrl}`}
                  className='imagesUploaderImage'
                />
                <button
                  className='buttonEditProduct'
                  onClick={() => handleImageDelete(imageUrl)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="product-div-right">
              <label className="product-label">Product Name</label>
              <input
                type="text"
                className="product-name"
                value={Product_Name}
                onChange={(e) => setProductName(e.target.value)}
              />

              <label className="product-label">Product Price</label>
              <input
                type="text"
                className="product-price"
                value={'$' + Price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="product-description">
                <label className="product-label">Product Description</label>
                <textarea
                  className="product-description-input"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </p>
              <div className="btn-groups">
                <button type="submit" className="buy-now-btn">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProductForm;
