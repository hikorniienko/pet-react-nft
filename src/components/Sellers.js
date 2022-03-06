import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useRequest from "hooks/useRequest";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

function Sellers() {
  const sellers = useRequest(getSellers);

  function getSellers(){
    const data = {
      "rows": 10,
      "fullname": "{firstName}~{lastName}",
      "verification": "{bool}",
      "id": "{numberRange|1, 10}",
      "amount": "{decimal|20}"
    };

    const searchParams = new URLSearchParams(data);
    return axios.get('http://filltext.com/?'+searchParams);
  }

  function elSlider() {
    if (sellers.data === null || typeof sellers.data !== "object") return;

    return sellers.data.map((seller, index) => {
      const key = seller.fullname + index;
      const count = index + 1;
      const jpg = `img/avatar/${index + 1}.jpg`;
      const webp = `img/avatar/${index + 1}.webp`;
      const to = "/user/"+ (index + 1);

      return (
        <SwiperSlide key={key}>
          <Link to={to} className="home-slider__item">
              <div className="home-slider__count">{count}</div>
              <div className="home-slider__img">
                <picture>
                  <source srcSet={webp} type="image/webp" />
                  <source srcSet={jpg} type="image/jpg" />
                  <img src={jpg} alt={seller.fullname} />
                </picture>
                <span className={seller.verification ? "active" : ""}>
                  <svg><use href="img/sprite.svg#check"></use></svg>
                </span>
              </div>
              <div className="home-slider__name">{seller.fullname}</div>
              <div className="home-slider__price">{seller.amount.toFixed(2)} <span>ETH</span></div>
          </Link>
        </SwiperSlide>
      );
    });
  }

  return (
    <div className={sellers.loading ? "home-slider loading" : "home-slider"} >
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        breakpoints={{
          667: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 20
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {elSlider()}
      </Swiper>
      <div className="home-slider__nav">
        <svg className="swiper-button-prev">
          <use href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg className="swiper-button-next">
          <use href="img/sprite.svg#arrow-right"></use>
        </svg>
      </div>
    </div>
  );
}
export default Sellers;
