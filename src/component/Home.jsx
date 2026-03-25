import React, { useState } from "react";
import "swiper/css/bundle";
import "../swiper.css";
import Logo from "../assets/Logo.png";
import MovieDB from "../data/movieDB.js";
import HeroSlides from "./props/HeroSlides.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Parallax } from "swiper/modules";
import HorizontalCard from "./props/HorizontalCard.jsx";
import VerticalCard from "./props/VerticalCard.jsx";

const Home = () => {
  let topRatedMovie = [...MovieDB];
  topRatedMovie.sort((a, b) => Number(a.rating) - Number(b.rating)).reverse();

  //getting data from local storage
  const [moviesData, setMoviesData] = useState(getData());

  const sortedMovies = [...moviesData].sort(
    (a, b) => Number(b.rating) - Number(a.rating),
  );

  function getData() {
    const data = localStorage.getItem("movieData");

    return data ? JSON.parse(data) : [];
  }

  return (
    <>
      <main>
        {/* Hero section */}

        <section className="hero-section">
          {/* slides lists! */}
          <Swiper
            className="swiper hero-swiper"
            loop={true}
            parallax={true}
            speed={2000}
            autoplay={{
              delay: 5000,
            }}
            modules={[Parallax, Autoplay]}
          >
            {MovieDB.map((data, idx) => {
              return (
                <SwiperSlide key={idx} className="swiper-slide hero-slide">
                  <HeroSlides
                    image={data.image}
                    imageAlt={data.title}
                    title={data.title}
                    description={data.description}
                    ageRating={data.ageRating}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* End of all slides :D */}
        </section>

        {/* Lanjut nonton section */}
        <section className="continue-watch-section section-padding content-padding-lr">
          <h2 className="text-xl section-title">Melanjutkan Tonton Film</h2>
          <Swiper
            className="swiper continue-watch-swiper"
            loop={false}
            slidesPerView={1}
            spaceBetween={16}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              600: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1150: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
          >
            {/* slides lists! */}
            {MovieDB.map((data, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  className="swiper-slide hor-card continue-watch-slide"
                >
                  <HorizontalCard
                    image={data.image}
                    imageAlt={data.title}
                    title={data.title}
                    rating={data.rating}
                  />
                </SwiperSlide>
              );
            })}
            {/* End of all slides :D */}

            {/* navigation */}
            <div className="swiper-button-next" />
            <div className="swiper-button-prev" />
          </Swiper>
        </section>

        {/* Top Rating section */}
        <section className="top-rating-section section-padding content-padding-lr">
          <h2 className="text-xl section-title">
            Top Rating Film dan Series Hari ini
          </h2>

          {/* slides lists! */}
          <Swiper
            className="swiper top-rating-swiper ver-swiper"
            loop={false}
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={10}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              900: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1150: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation]}
          >
            {sortedMovies.map((data, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  className="swiper-slide ver-card ver-slide"
                >
                  <VerticalCard
                    image={data.poster}
                    imageAlt={data.title}
                    rating={data.rating}
                    lazyload="enabled"
                  />
                </SwiperSlide>
              );
            })}
            {/* navigation */}
            <div className="swiper-button-next" />
            <div className="swiper-button-prev" />
          </Swiper>
          {/* End of all slides :D */}
        </section>

        {/* Trending section */}
        <section className="trending-section section-padding content-padding-lr">
          <h2 className="text-xl section-title">Film Trending</h2>
          <Swiper
            className="swiper top-rating-swiper ver-swiper"
            loop={false}
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={10}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              900: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1150: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation]}
          >
            {sortedMovies.map((data, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  className="swiper-slide ver-card ver-slide"
                >
                  <VerticalCard
                    image={data.poster}
                    imageAlt={data.title}
                    rating={data.rating}
                    lazyload="enabled"
                  />
                </SwiperSlide>
              );
            })}
            {/* navigation */}
            <div className="swiper-button-next" />
            <div className="swiper-button-prev" />
          </Swiper>
        </section>

        {/* Rilisbaru section */}
        <section className="rilisbaru-section section-padding content-padding-lr">
          <h2 className="text-xl section-title">Rilis Baru</h2>
          <Swiper
            className="swiper top-rating-swiper ver-swiper"
            loop={false}
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={10}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              900: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1150: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation]}
          >
            {sortedMovies.map((data, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  className="swiper-slide ver-card ver-slide"
                >
                  <VerticalCard
                    image={data.poster}
                    imageAlt={data.title}
                    rating={data.rating}
                    lazyload="enabled"
                  />
                </SwiperSlide>
              );
            })}
            {/* navigation */}
            <div className="swiper-button-next" />
            <div className="swiper-button-prev" />
          </Swiper>
        </section>
      </main>

      {/* *Scripts below are mine */}
    </>
  );
};

export default Home;
