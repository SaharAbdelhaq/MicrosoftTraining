import React from "react";
import "./Card.css";
// import img from "./img.jpg";
import { useNavigate } from "react-router-dom";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ product, title, type, location, price, img, id }) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate("/Product/" + id);
  };

  return (
    <div className="Card">
      {product.favourite ? (
        <FontAwesomeIcon icon={solid("star")} className="favourite-icon" />
      ) : (
        <FontAwesomeIcon icon={regular("star")} className="favourite-icon" />
      )}
      <div className="card-img-div">
        <img src={img} alt="" className="card-img" />
      </div>

      <h2>{title}</h2>
      <div className="card-info">
        <p>
          <FontAwesomeIcon icon={solid("cart-shopping")} /> {type}
        </p>
        <p>
          <FontAwesomeIcon icon={solid("location-dot")} /> {location}
        </p>
        <p>
          <FontAwesomeIcon icon={solid("tag")} /> {price}
        </p>
      </div>
      <div className="card-buttons">
        {" "}
        <button className="card-btn" onClick={handleView}>
          View
        </button>
        <button className="card-btn">Contact</button>
      </div>
    </div>
  );
};

export default Card;
