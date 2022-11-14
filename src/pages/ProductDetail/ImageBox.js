import React, { useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import {GiThreePointedShuriken} from 'react-icons/gi'
import "react-image-gallery/styles/scss/image-gallery.scss";
import { ProductContext,useContext } from './Context';

function ImageBox() {

  const {setThreeDView,productData} = useContext(ProductContext);
  let productImage = [];
  
  {productData &&
    productData.images.map(element => (
        productImage.push({original: element, thumbnail: element,})
    ))
  }


  return (
        <div className='productImageBox'>
          <ImageGallery items={productImage && productImage} showFullscreenButton={false} showPlayButton={false} showBullets={false}/>
          <div className='threedIcon'>
            <GiThreePointedShuriken className='icon' onClick={()=>setThreeDView(true)}/>
          </div>
        </div>
  )
}

export default ImageBox