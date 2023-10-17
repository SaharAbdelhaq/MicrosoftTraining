import React from "react";
import "./ReviewsPanel.css";
import Rating from "../Rating";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "./img.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewsPanel = () => {
  const [reviews, setReviews] = useState([]);
  const ratings = [0, 0, 0, 0, 0];
  const total = 59;

  useEffect(() => {
    axios
      .get("http://localhost:9999/product/reviews2", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExOSwiZW1haWwiOiJvbWFyQGdtYWlsLmNvbSIsInBob25lIjoiNTYiLCJpYXQiOjE2ODMyMDEyNTN9.jYU4YmZkl8UYYSr_JxZOy-utW-YaEr1ia4DwwlTFkgQ",
        },
      })
      .then(function (response) {
        const { data } = response;
        console.log(data);
        setReviews(data);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="ReviewsPanel">
      <div className="stats-panel">
        <h2 className="reviews-title">Reviews</h2>
        <h2 className="reviews-avg">{4.1}</h2>
        <div>{Rating()}</div>
        <p className="reviews-stats-text">based on {reviews.length} reviews</p>

        {ratings.map((e, index) => {
          return (
            <div key={index}>
              <FontAwesomeIcon
                icon={solid("star")}
                className="icon-star-gold "
              />
              {5 - index}
              <progress id="file" value={e} max={reviews.length} />
            </div>
          );
        })}
      </div>
      <div className="reviews">
        {reviews.map((e, index) => {
          ratings[e.Rating]++;
          return (
            <div className="review" key={index}>
              <img src={img} alt="" className="review-img" />
              <div className="review-body">
                <h2 className="review-username">{e.User_ID}</h2>
                <div>{Rating(e.Rating)}</div>
                <p>{e.Comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsPanel;
// const reviews = [{}, {}, {}, {}, {}, {}, {}];
