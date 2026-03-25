import React, { useEffect, useState } from "react";
import StarsIcon from "/src/assets/stars.png";

const VerticalCard = (prop) => {
  const [isLazyloadEnabled, setIsLazyloadEnabled] = useState(false);

  useEffect(() => {
    if (prop.lazyload && prop.lazyload.toLowerCase() === "enabled") {
      setIsLazyloadEnabled(true);
    } else {
      setIsLazyloadEnabled(false);
    }
  }, []);

  return (
    <a href="">
      <img src={prop.image} alt={prop.imageAlt} lazyload="true" />
      {isLazyloadEnabled ? (
        <div className="swiper-lazy-preloader"></div>
      ) : (
        <></>
      )}
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
