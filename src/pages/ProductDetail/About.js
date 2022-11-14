import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ProductContext,useContext} from './Context'

function About() {
const {productData} = useContext(ProductContext);
const [moreData,setMoreData]= useState();
  useEffect(()=>{
    {productData &&
      axios.get(`http://localhost:3004/products?model_like=${productData.model}&_limit=4`)
      .then(response => setMoreData(response.data))
    }
  },[productData]);
  return (
    <div className='aboutBox'>
          <h2 className='productTitle'>{productData && productData.title}</h2>
          <h5 className='productModel'>{productData && productData.model}</h5>
          <p className='productDesc'>{productData && productData.description}</p>
          <div className='productMore'>
            {moreData &&
                moreData.map((data) => (
                  <img className='moreImage' src={data.thumb} alt='' key={data.id}/>
                ))
            }
              <Link to={`/products/${productData && productData.model}`}><button className='moreButton'>More</button></Link>
          </div>
          <div className='date'>Release Date : <span>{productData && productData.date}</span></div>
        </div>
  )
}

export default About