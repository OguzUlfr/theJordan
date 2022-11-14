import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import { Link } from 'react-router-dom';

import './SearchList.scss'

function SearchList() {
    const {keyword} = useParams();
    const [data,setData] = useState();
    useEffect(()=>{
        axios.get(`http://localhost:3004/products?title_like=${keyword}`)
        .then(response => setData(response.data));
    },[]);
  return (
    <>
        <Header/>
        <div className='searchList'>
            {data &&
                data.map(product => (
                <div className='searchCard'>
                <img src={product.thumb} alt=''/>
                    <div className='searchAbout'>
                        <h3 className='searchTitle'>{product.title}</h3>
                        <p className='searchDesc'>{product.description}</p>
                        <div className='searchBottom'>
                            <div className='searchColor'>Color : <span>{product.color}</span></div>
                            <Link to={`/product/${product.id}`}><button>MORE</button></Link>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    </>
  )
}

export default SearchList