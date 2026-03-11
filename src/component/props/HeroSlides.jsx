import React from "react";
import VolumeOffIcon from "/src/assets/volume-off.png";
import InfoOutlineIcon from "/src/assets/information-outline.png";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Parallax } from "swiper/modules";

const HeroSlides = (prop) => {
  return (
    <>
      {/* <div className="swiper-wrapper hero-swiper-wrapper"> */}
      {/* <SwiperSlide className="swiper-slide hero-slide"> */}
      <img
        className="hero-images"
        src={prop.image}
        alt={prop.imageAlt}
        loading="lazy"
      />
      <div className="swiper-lazy-preloader"></div>
      <div className="layout content-padding-lr">
        <h1 className="font-bold text-xxl" data-swiper-parallax="-300">
          {prop.title}
        </h1>
        <p className="hero-title-desc text-cut" data-swiper-parallax="-300">
          {prop.description}
        </p>
        <div className="hero-buttons" data-swiper-parallax="-300">
          <a className="blue-btn font-bold text-sm centralize">Mulai</a>
          <a className="gray-btn font-bold text-sm centralize">
            <img
              className="info-outline-icon"
              src={InfoOutlineIcon}
              alt="information-outline.png"
            />
            Selengkapnya
          </a>
          <a className="gray-btn font-bold text-sm centralize">
            {prop.ageRating}
          </a>
          <span className="volume-btn font-bold text-sm centralize">
            <img
              className="volume-off-icon"
              src={VolumeOffIcon}
              alt="volume-off.png"
            />
          </span>
        </div>
      </div>
      {/* </SwiperSlide> */}
      {/* </div> */}
    </>
  );
};

export default HeroSlides;
