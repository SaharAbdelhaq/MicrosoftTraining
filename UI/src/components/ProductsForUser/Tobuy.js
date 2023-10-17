import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./Tobuy.css";
function Tobuy(props) {
  const [Products, setProducts] = useState([]);

  const search = useLocation().search;
  // const name = new URLSearchParams(search).get("name");
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9999/user/products/${name}`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
        }
      })
      .then((response) => {
        console.log("response data:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [name]);

  console.log("products:", Products);


  const sendProduct = (index) => {
    alert(`Product index: ${index}`);
  };

  const addProducttoFavorites = (product) => {
    axios
      .post(
        `http://localhost:9999/user/favorite/add${product.Product_ID}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
          },
        }
      )

      .then((response) => {
        // add the product to the list of favorite products
        setProducts([...Products, product]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container2-Tobuy">
        <h1 className="HOHO2" 
         style={{
          textAlign: "left",
          marginLeft: "40px",
          fontWeight: "bold",
          fontFamily: "Cyreal",
          color: "#144E5A",
          fontSize: "35px",
        }}
        >Lets buy.. Products for {name} </h1>
        <div className="main-cardTobuy2">
          <div className="cardsTobuy2">
            {Products.map((product, index) => (
              <div className="cardTobuy2" key={product.Product_ID}>
                <div className="contentTobuy2">

                  <Link
                    to={`/product/${product.Product_ID}`}
                    className="img-bTobuy1"
                  >
                    <img src={product.Primary_Image} alt="" />
                  </Link>

                  <div className="detailsTobuy2">
                    <div className="nameTobuy2">{product.Product_Name}</div>
                    <div className="priceTobuy2">{product.Price}</div>
                    {/* <div className="descriptionFAV2">{product.description}</div> */}
                    <button
                      onClick={() => {
                        const email = localStorage.getItem("user_email");
                        const BOName = product.Business_Name;
                        const url = `http://localhost:3001?email=${email}&BOName=${BOName}`;
                        window.open(url, "_blank");
                      }}
                      className="chat-btn"
                    >


                      <FontAwesomeIcon icon={faComment} />
                      Send in Chat
                    </button>
                    <button
                      onClick={() => addProducttoFavorites(product)}
                      className="heart-btn"
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
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

export default Tobuy;
