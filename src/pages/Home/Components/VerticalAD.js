import axios from 'axios';
import React, { useEffect, useState } from 'react'

function VerticalAD() {
    const [ad,setAd] = useState();
    useEffect(()=>{
        axios.get('http://localhost:3004/verticalAd')
        .then(response => setAd(response.data));
    },[]);
  return (
    <div className='verticalAD'>
         {ad &&
            ad.map(data => (
                <div className='adCardV' key={data.id}>
                    <img src={data.image} alt=''/>
                </div>
            ))
         }
    </div>
  )
}

export default VerticalAD