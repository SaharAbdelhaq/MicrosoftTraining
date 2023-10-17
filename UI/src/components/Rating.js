import React from "react";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = (rating = 4) => {
  let RatingObject = [];
  for (let i = 0; i < 5; i++) {
    rating > i
      ? RatingObject.push(
          <FontAwesomeIcon
            icon={solid("star")}
            className="icon-star-gold "
            key={i}
          />
        )
      : RatingObject.push(
          <FontAwesomeIcon
            icon={regular("star")}
            className="icon-star-gold "
            key={i}
          />
        );
  }

  return RatingObject;
};

export default Rating;
