import React, { useState, useEffect } from 'react';
import './BOproducts.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";

function BOproducts() {
const [products, setProducts] = useState([]);
 let  name  = localStorage.getItem("username");

 console.log("name1",name);
console.log(name);

 localStorage.setItem("username", name);

 
  useEffect(() => {
  
console.log("name",name);
console.log(name);

    axios.get(`http://localhost:9999/businessOwner/products/${name}`, {
      headers: {
        Authorization: localStorage.getItem("access_token")
      },
      })
      .then(response => {
        console.log("response data:", response.data);
        setProducts(response.data)
      })
      .catch(error => console.log(error));
  }, []);

  console.log("products:", products);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="container2-BOproducts">
        <h1 className="HOHO3">My Products... </h1>
        <div className="main-cardBOproducts2">
          <div className="cardsBOproducts2">
            {products.map((product, index) => (
              <div className="cardBOproducts2" key={index}>
                <div className="contentBOproducts2">


                <Link to={`/BOproduct/${product.Product_ID}`} className="img-bBOproducts1">
                   <img src={product.Primary_Image} alt="" />
                </Link>


                  <div className="detailsBOproducts2">
                    <div className="nameBOproducts2">{product.Product_Name}</div>
                    <div className="priceBOproducts2">{product.Price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BOproducts;
