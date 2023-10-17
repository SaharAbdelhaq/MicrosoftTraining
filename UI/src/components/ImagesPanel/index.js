import React from "react";
import img from "./img.jpg";
import "./ImagesPanel.css";

const ImagesPanel = () => {
  return (
    <div className="ProductOverview-imgs-div">
      <div className="ProductOverview-imgs-primary-div">
        <img src={img} alt="" className="img img-primary" />
      </div>
      <div className="ProductOverview-imgs-secondery-div">
        <img src={img} alt="" className="img img-secondary" />
        <img src={img} alt="" className="img img-secondary" />
      </div>
    </div>
  );
};

export default ImagesPanel;
