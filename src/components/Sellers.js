import {useEffect, useState} from "react";
import axios from "axios";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import Seller from "components/Seller";

function Sellers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParamsData = {
      rows: 10,
      fullname: "{firstName}~{lastName}",
      verification: "{bool}",
      id: "{numberRange|1, 10}",
      amount: "{decimal|20}"
    };

    const searchParams = new URLSearchParams(searchParamsData);
    setLoading(true);
    axios.get('https://filltext.com/?'+searchParams)
        .then(response => setData(response.data))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, []);

  const dataSellers = data.map((seller, index) => (
    <SwiperSlide key={index}>
      <Seller data={seller} index={index}/>
    </SwiperSlide>
  ));

  if (loading) {
    return (<div className="loading"></div>)
  }

  return (
    <div className="home-slider" >
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          667: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 5
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {dataSellers}
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
