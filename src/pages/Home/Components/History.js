import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";

import {AiOutlineHistory} from 'react-icons/ai'

function History() {
    const [history,setHistory] = useState([]);

    useEffect(()=>{
        setHistory(JSON.parse(localStorage.getItem('history')));
    },[]);

    console.log(history);

    const addHistory = (thumb,title,model,id)=>{
        if(!history){
            const historyObject = [{
                "thumb": thumb,
                "title" : title,
                "model" : model,
                "id" : id
            }];
            localStorage.setItem("history", JSON.stringify(historyObject));
        }else{
            const historyObject = [...history,{
                "thumb": thumb,
                "title" : title,
                "model" : model,
                "id" : id
            }];
            localStorage.setItem("history", JSON.stringify(historyObject));
        }
            
    }

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
                    slidesPerView: history === [] ? 5 : 1,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="cardList"
              >
        {history &&
            history.map(product => (
                <SwiperSlide className='cardItem' key={product.id}>
                    <img className='thumb' src={product.thumb} alt=''/>
                    <div className='title'>{product.title}</div>
                    <div className='bottomGroup'>
                        <span>{product.model}</span>
                        <button onClick={()=>addHistory('Deneme Title','Air Jordan işte',4)}>MORE</button>
                    </div>
                </SwiperSlide>
            ))
        }
        <SwiperSlide className='historyNot' style={{display : history ? 'none' : 'block'}}></SwiperSlide>
        </Swiper>
       
    </div>
  )
}

export default History