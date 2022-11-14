import React, { useEffect, useState } from 'react'
import{BiCategory} from 'react-icons/bi'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Category() {
  const [category,setCategory] = useState();
  useEffect(()=>{
    axios.get('http://localhost:3004/category')
    .then(response => setCategory(response.data));
  },[]);
  return (
    <div className='CategoryBox'>
        <div className='categoryTitle'><BiCategory className='categoryIcon'/>Category</div>
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
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="cardList"
              >
                {category &&
                    category.map(data => (
                      <SwiperSlide className='categoryCard' key={data.id}>
                        <Link className='categoryLink' to={`/products/${data.name}`}> 
                        <img src={data.image} alt=''/>
                        {data.name}
                        </Link>
                      </SwiperSlide>
                    ))
                }
              </Swiper>
    </div>
  )
}

export default Category