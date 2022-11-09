import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import './Favorite.scss'

function Favorites() {
const [data,setData] = useState();
useEffect(()=>{
    axios.get('http://localhost:3004/favorites')
    .then(response => setData(response.data))
},[]);

  return (
    <>
        <Header/>
        <div className='favoriteList'>
            {data && 
                data.map(favorite => (
                <div className='cardItem' key={favorite.id}>
                    <img className='thumb' src={favorite.thumb} alt=''/>
                    <div className='title'>{favorite.title}</div>
                    <div className='bottomGroup'>
                        <span>{favorite.model}</span>
                        <button>MORE</button>
                    </div>
                </div>
                ))
            }
        </div>
    </>
  )
}

export default Favorites