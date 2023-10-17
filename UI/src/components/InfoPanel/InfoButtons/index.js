import React from "react";
import "./InfoButtons.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InfoButtons = ({ id }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    const token = localStorage.getItem("access_token");
    axios
      .delete("http://localhost:9999/product/removeSpecificProduct/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log("deleted item" + id + response);
        navigate("/home");
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };
  const handleEdit = () => {
    navigate("/EditProductForm/" + id);
  };
  return (
    <div className="info-buttons">
      <button className="info-buttons-item" onClick={handleEdit}>
        Edit information
      </button>
      <button className="info-buttons-item" onClick={handleDelete}>
        Delete product
      </button>
    </div>
  );
};

export default InfoButtons;
