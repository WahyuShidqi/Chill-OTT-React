import React from "react";
import StarsIcon from "/src/assets/stars.png";

const HorizontalCard = (prop) => {
  return (
    <>
      {/* <div className="swiper-slide hor-card continue-watch-slide"> */}
      <a href="">
        <img src={prop.image} alt={prop.imageAlt} />

        <div className="swiper-lazy-preloader"></div>

        <div className="continue-watch-section-layout">
          <h3 className="text-md text-wrap">{prop.title}</h3>

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
      {/* </div> */}
    </>
  );
};

export default HorizontalCard;
