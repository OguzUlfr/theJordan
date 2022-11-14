import React, { useEffect, useState } from 'react'
import './ProductDetail.scss'
import ImageBox from './ImageBox';
import About from './About';
import Detail from './Detail';
import Header from '../Header'
import ThreeD from './ThreeD';
import {ProductContext} from './Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const {id} = useParams();
  const [productData,setProductData] = useState();
  const [threeDView,setThreeDView] = useState(false);

  const data ={
    threeDView,
    setThreeDView,
    productData
  }

  useEffect(()=>{
    setTimeout(()=>{
      axios.get(`http://localhost:3004/products/${id}`)
      .then(response => setProductData(response.data));
    },1000);
  },[]);

  return (
    <ProductContext.Provider value={data}>
      <Header/>
      <div className='productDetailBox'>
        <ImageBox/>
        <About/>
      </div>
      <Detail/>
      <ThreeD/>
    </ProductContext.Provider>
  )
}

export default ProductDetail