import React, { useEffect, useState } from "react";
import "./ProductOverviewUser.css";
import ImagesPanel from "./ImagesPanel";
import ProductInfo from "./ProductInfo";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../../components/RatingAndComment/Rating";

const handleClose = () => {
  document.getElementById("popup").style.display = "none";
  document.getElementById("aura").style.display = "none";
};

const ProductOverviewUser = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:9999/product/productByID/" + id, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExOSwiZW1haWwiOiJvbWFyQGdtYWlsLmNvbSIsInBob25lIjoiNTYiLCJpYXQiOjE2ODMyMDEyNTN9.jYU4YmZkl8UYYSr_JxZOy-utW-YaEr1ia4DwwlTFkgQ",
        },
      })
      .then(function (response) {
        const { data } = response;
        setInfo(data);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  }, [id]);

  if (Object.keys(info).length === 0) {
    // Render a loading indicator or an empty div until the API response is available
    return <div>Loading...</div>;
  }

  return (
    <div className="ProductOverviewUser">
      <div className="ProductOverviewUser-main">
        <ImagesPanel imgs={info.imagesURL} />
        <div>
          <ProductInfo data={info} />
          {/* <button className="contact-btn">Send</button> */}
          <button 

                      onClick={() => {

                        const email = localStorage.getItem("user_email");

                        const BOName = localStorage.getItem("contact_with");

                        const url = `http://localhost:3001?email=${email}&BOName=${BOName}`;

                        window.open(url, "_blank");

                      }}

                      className="contact-btn"

                    > Send in chat</button>
          <Rating />
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewUser;
