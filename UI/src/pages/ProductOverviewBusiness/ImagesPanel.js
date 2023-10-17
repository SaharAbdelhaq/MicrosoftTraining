import React from "react";
import "./ProductOverviewUser.css";

const ImagesPanel = ({ imgs }) => {
  return (
    <div className="ProductOverview-imgs-div">
      <div className="ProductOverview-imgs-primary-div">
        <img
          src={imgs[0] && imgs[0].Image_URL}
          alt=""
          className="img img-primary"
        />
      </div>
      <div className="ProductOverview-imgs-secondery-div">
        {imgs[1] && (
          <img
            src={imgs[1] && imgs[1].Image_URL}
            alt=""
            className="img img-secondary"
          />
        )}

        {imgs[2] && (
          <img
            src={imgs[2] && imgs[2].Image_URL}
            alt=""
            className="img img-secondary"
          />
        )}
      </div>
    </div>
  );
};

export default ImagesPanel;
