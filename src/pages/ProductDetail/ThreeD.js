import React from 'react'
import {FaWindowClose} from 'react-icons/fa'
import {TbHandClick} from 'react-icons/tb'
import { ReactImageTurntable } from 'react-image-turntable';
import { ProductContext,useContext } from './Context';


function ThreeD() {

    const {threeDView,setThreeDView,productData} = useContext(ProductContext);


  return (
    <div className='threeDBox' style={{display: threeDView ? 'flex' : 'none'}}>
        {productData &&
        <div className='threeDCard'>
            <ReactImageTurntable images={productData.threeD} movementSensitivity={30}/>
            <FaWindowClose className='closeButton' onClick={()=>setThreeDView(false)}/>
            <TbHandClick className='rotateIcon'/>
        </div>
        }
      </div>
  )
}

export default ThreeD