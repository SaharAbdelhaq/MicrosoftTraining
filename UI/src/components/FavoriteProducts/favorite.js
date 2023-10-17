import React, { useState, useEffect } from 'react';
import './favorite.css';
import cam from './cam.jpg'; // Tell webpack this JS file uses this image
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

function Favorites() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9999/user/favorites',
    {headers:
    {Authorization: localStorage.getItem("access_token")}})
    .then(response => {
        console.log("response data: ", response.data); 

        setFavoriteProducts(response.data);
      })
      .catch(error => console.log(error));
  }, []);
  

  const removeProduct = (index) => {
    const productId = favoriteProducts[index].Product_ID;
    console.log("productId: ", productId);

    
    axios
      .delete(`http://localhost:9999/user/favorite/remove/${productId}`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
        }
      })
      .then((response) => {
        const newProducts = Array.from(favoriteProducts);
        newProducts.splice(index, 1);
        setFavoriteProducts(newProducts);
        console.log("favoriteProducts after removing:", newProducts);
    
        Swal.fire({
          title: 'Success',
          text: 'Product removed successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to remove product from favorite list',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    
      
  };
  
  
  return (
    <div style={{backgroundColor: "white"}}>
      <div className="container2-FAV" >
        <h1 className="HOHO">Favorites </h1>
        <div className="main-cardFAV2">
          <div className="cardsFAV2">
          {favoriteProducts.map((favoriteProduct, index) => (
  <div className="cardFAV2" key={index}>
    <div className="contentFAV2">

      {/* <a href="" className="img-bFAV1">
        <img src={favoriteProduct.Product.Primary_Image} alt="" />
      </a> */}

      <Link
                   to={`/product/${favoriteProduct.Product.Product_ID}`}
                    className="img-bFAV1"
                  >
                    <img src={favoriteProduct.Product.Primary_Image} alt="" />
                  </Link>

      <div className="detailsFAV2">
        <div className="nameFAV2">{favoriteProduct.Product.Business_Name}</div>
        <div className="priceFAV2">{favoriteProduct.Product.Price}</div>
        <div className="descriptionFAV2">{favoriteProduct.Product.Description}</div>
        <button className="removeingg-button" onClick={() => { 
    removeProduct(index); 

// if (window.confirm("Are you sure you want to remove this product from favorite list?")) {
//     alert("Product removed!"); 
//   }

}}>Remove</button>
      </div>
    </div>
  </div>
))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorites;

