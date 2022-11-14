import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import './ProductList.scss'
import ProductCard from '../ProductCard';

function ProductList() {
    const {model} = useParams();
    const [productData,setProductData] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:3004/products?model_like=${model}`)
        .then(response => setProductData(response.data));
    },[]);

  return (
    <div>
        <Header/>
        <ul className='productListBox'>
        {productData &&
            productData.map(element => (
                <ProductCard thumb={element.thumb} title={element.title} model={element.model} id={element.id} key={element.id}/>     
            ))
        }
        </ul>
    </div>
  )
}

export default ProductList