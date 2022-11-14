import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import ProductCard from '../../ProductCard';

import {AiOutlineHistory} from 'react-icons/ai'

function History() {
    const [history,setHistory] = useState([]);

    useEffect(()=>{
        setHistory(JSON.parse(localStorage.getItem('history')));
    },[]);

  return (
    <div className='HistoryBox'>
        <div className='historyTitle'><AiOutlineHistory className='historyIcon'/>History</div>
        <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: history ? 5 : 1,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="cardList"
              >
        {history &&
            history.map(product => (
                <SwiperSlide key={product.id}>
                    <ProductCard thumb={product.thumb} title={product.title} model={product.model} id={product.id} />
                </SwiperSlide>
            ))
        }
        <SwiperSlide className='historyNot' style={{display : history ? 'none' : 'block'}}></SwiperSlide>
        </Swiper>
       
    </div>
  )
}

export default History