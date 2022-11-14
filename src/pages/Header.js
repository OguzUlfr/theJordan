import React, { useState } from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {FaHeart} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './Header.scss'


function Header() {

  const [searchKey,setSearchKey] = useState();

  return (
    <div className='Header'>
        <Link to='/' className='brandBox'><img className='brandLogo' src={process.env.PUBLIC_URL + '/logo.png'} alt=''/></Link>
        <div className='searchBox'>
            <form>
                <input placeholder='Product Search' onChange={(e)=>setSearchKey(e.target.value)}/>
                <Link to={`/search/${searchKey}`}><button><BiSearchAlt2 className='searchIcon'/></button></Link>
            </form>
        </div>
        <div></div>
    </div>
  )
}

export default Header