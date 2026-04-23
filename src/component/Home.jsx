import React, { useEffect, useState } from "react";
import "swiper/css/bundle";
import "../swiper.css";
import Logo from "../assets/Logo.png";
import MovieDB from "../data/movieDB.js";
import HeroSlides from "./props/HeroSlides.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Parallax } from "swiper/modules";
import HorizontalCard from "./props/HorizontalCard.jsx";
import VerticalCard from "./props/VerticalCard.jsx";
import useFetchData from "../api/useFetchData.jsx";

const Home = () => {
  // let topRatedMovie = [...MovieDB];
  // topRatedMovie.sort((a, b) => Number(a.rating) - Number(b.rating)).reverse();

  //*========================= fetch data ===============================
  const { data, loading, error, mutate } = useFetchData("products"); // CUSTOM HOOKS

  const [moviesData, setMoviesData] = useState();
  const [sortedMovies, setSortedMovies] = useState();
  useEffect(() => {
    if (data) {
      setMoviesData(data);
      console.log("data", data);
    }
    if (data && data.length > 0) {
      setSortedMovies(
        [...data].sort((a, b) => Number(b.rating) - Number(a.rating)),
      );
    }
  }, [data]);

  // if (!data || data.length < 1) {
  //   console.log("bruh");
  //   return (
  //     <>
  //       <h2>No data yet...</h2>
  //     </>
  //   );
  // }

  return (
    <main>
      {/* Hero section */}

      <section className="hero-section">
        {/* slides lists! */}
        {error && (
          <div className="centralized-content section-padding">
            <h2 className="empty-placeholder">{error}</h2>
          </div>
        )}
        {loading && (
          <div className="centralized-content section-padding">
            <h2 className="empty-placeholder">Loading...</h2>
          </div>
        )}
        {!error && !loading && moviesData?.length === 0 && (
          <div className="centralized-content section-padding">
            <h2 className="empty-placeholder">No movies yet...</h2>
          </div>
        )}
        {!error && !loading && moviesData?.length > 0 && (
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
            {moviesData?.map((data, idx) => {
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
        )}
        {/* End of all slides :D */}
      </section>

      {/* Lanjut nonton section */}
      <section className="continue-watch-section section-padding content-padding-lr">
        <h2 className="text-xl section-title">Melanjutkan Tonton Film</h2>
        {error && <h3 className="empty-placeholder">{error}</h3>}
        {loading && <h3 className="empty-placeholder">Loading...</h3>}
        {!error && !loading && moviesData?.length === 0 && (
          <h3 className="empty-placeholder">No movies yet...</h3>
        )}
        {!error && !loading && moviesData?.length > 0 && (
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
            {moviesData.map((data, idx) => {
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
        )}
      </section>

      {/* Top Rating section */}
      <section className="top-rating-section section-padding content-padding-lr">
        <h2 className="text-xl section-title">
          Top Rating Film dan Series Hari ini
        </h2>
        {/* slides lists! */}
        {error && <h3 className="empty-placeholder">{error}</h3>}
        {loading && <h3 className="empty-placeholder">Loading...</h3>}
        {!error && !loading && moviesData?.length === 0 && (
          <h3 className="empty-placeholder">No movies yet...</h3>
        )}
        {!error && !loading && sortedMovies?.length > 0 && (
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
        )}
        {/* End of all slides :D */}
      </section>

      {/* Trending section */}
      <section className="trending-section section-padding content-padding-lr">
        <h2 className="text-xl section-title">Film Trending</h2>
        {error && <h3 className="empty-placeholder">{error}</h3>}
        {loading && <h3 className="empty-placeholder">Loading...</h3>}
        {!error && !loading && moviesData?.length === 0 && (
          <h3 className="empty-placeholder">No movies yet...</h3>
        )}
        {!error && !loading && sortedMovies?.length > 0 && (
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
        )}
      </section>

      {/* Rilisbaru section */}
      <section className="rilisbaru-section section-padding content-padding-lr">
        <h2 className="text-xl section-title">Rilis Baru</h2>
        {error && <h3 className="empty-placeholder">{error}</h3>}
        {loading && <h3 className="empty-placeholder">Loading...</h3>}
        {!error && !loading && moviesData?.length === 0 && (
          <h3 className="empty-placeholder">No movies yet...</h3>
        )}
        {!error && !loading && sortedMovies?.length > 0 && (
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
        )}
      </section>
    </main>
  );
};

export default Home;
