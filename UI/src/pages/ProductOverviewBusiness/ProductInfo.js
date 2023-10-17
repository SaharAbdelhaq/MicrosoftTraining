import React from "react";
import Rating from "../../components/Rating";
import "./ProductInfo.css";
const ProductInfo = ({ data }) => {
  const { info } = data;
  const { ratingAVG } = data;
  return (
    <div className="info-main">
      <h3 className="info-main-item">
        Title: <span className="span-title">{info[0]["Product_Name"]}</span>
      </h3>
      <h3 className="info-main-item">
        Seller: <span className="span-rating">{info[0]["Business_Name"]}</span>
      </h3>
      <h3 className="info-main-item">
        Price: <span className="span-price">{"$" + info[0]["Price"]}</span>
      </h3>
      <h3 className="info-main-item">
        Rating:{" "}
        <span className="span-rating">{Rating(Math.floor(ratingAVG))}</span>
      </h3>

      <h3 className="info-main-item">
        Description:{" "}
        <span className="span-description">{info[0]["Description"]}</span>
      </h3>
    </div>
  );
  // return (
  //   <div className="info">
  //     <h3 className="info-main-item">
  //       Title: <span className="span-title">Bracelet</span>
  //     </h3>
  //     <h3 className="info-main-item">
  //       Price: <span className="span-price">$13.99</span>
  //     </h3>
  //     <h3 className="info-main-item">
  //       Rating: <span className="span-rating">x</span>
  //     </h3>
  //     <h3 className="info-main-item"></h3>
  //   </div>
  // );
};

export default ProductInfo;
