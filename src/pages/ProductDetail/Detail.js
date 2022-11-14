import React from 'react'
import {BiDetail} from 'react-icons/bi'
import { ProductContext,useContext} from './Context'

function Detail() {
    const {productData} = useContext(ProductContext);
  return (
    <div className='detailBox'>
        <div className='title'><BiDetail className='titleIcon'/>Detail</div>
        <p className='detailtext'>{productData && productData.about}</p>
      </div>
  )
}

export default Detail