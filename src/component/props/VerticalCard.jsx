import React from "react";
import StarsIcon from "/src/assets/stars.png";

const VerticalCard = (prop) => {
  return (
    <a href="">
      <img src={prop.image} alt={prop.imageAlt} lazyload="true" />
      <div className="swiper-lazy-preloader"></div>
      <div className="ver-card-text-layout">
        <div className="movie-rating">
          <img
            className="rating-icon"
            src={StarsIcon}
            alt="stars.png"
            lazy-loading="true"
          />

          <span className="text-xsm">{prop.rating}/5</span>
        </div>
      </div>
    </a>
  );
};

export default VerticalCard;
