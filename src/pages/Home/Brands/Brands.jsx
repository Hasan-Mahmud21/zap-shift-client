// import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
// import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  const brandLogos = [
    amazon,
    casio,
    amazon_vector,
    moonstar,
    randstad,
    star,
    start_people,
  ];
  return (
    <Swiper
      loop={true}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      modules={[Autoplay]}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          <img src={logo} alt={`Brand Logo ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
