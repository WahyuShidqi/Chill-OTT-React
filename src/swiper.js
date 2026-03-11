const heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  parallax: true,
  speed: 2000,
  autoplay: {
    delay: 5000,
  },
});

const continueWatchSwiper = new Swiper(".continue-watch-swiper", {
  loop: false,
  slidesPerView: 1,
  centeredSlides: false,
  spaceBetween: 16,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    600: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1150: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    // 1150: {
    //   slidesPerView: 5,
    //   spaceBetween: 50,
    // },
  },
});

const topRatingSwiper = new Swiper(".top-rating-swiper", {
  loop: false,
  slidesPerView: 3,
  centeredSlides: false,
  spaceBetween: 10,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    900: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1150: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});

const trendingSwiper = new Swiper(".trending-swiper", {
  loop: false,
  slidesPerView: 3,
  centeredSlides: false,
  spaceBetween: 10,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    900: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1150: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});

const rilisBaruSwiper = new Swiper(".rilisbaru-swiper", {
  loop: false,
  slidesPerView: 3,
  centeredSlides: false,
  spaceBetween: 10,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    900: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1150: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});
