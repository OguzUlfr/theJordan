import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper";
import "swiper/css";
import '../Home.scss'
import axios from 'axios';


function CarouselAd() {
    const [adData,setAdData] = useState();

    useEffect(()=>{
        axios.get('http://localhost:3004/carousel')
        .then(response => setAdData(response.data));
    },[]);

  return (
    <Swiper
    className="mySwiper"
    autoplay={{
        delay: 4000,
        disableOnInteraction: false,
    }}
    modules={[Autoplay]}
    >
        {adData &&
            adData.map(ad => (
                <SwiperSlide className='sliderImage' key={ad.id}><img src={ad.link} alt=''/></SwiperSlide>
            ))
        }
      </Swiper>
  )
}

export default CarouselAd