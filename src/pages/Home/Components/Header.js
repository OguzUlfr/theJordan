import React from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {FaHeart} from 'react-icons/fa'

function Header() {
  return (
    <div className='Header'>
        <img className='brandLogo' src={process.env.PUBLIC_URL + '/logo.png'} alt=''/>
        <div className='searchBox'>
            <form>
                <input placeholder='Product Search'/>
                <button><BiSearchAlt2 className='searchIcon'/></button>
            </form>
        </div>
        <button className='favoriteButton'>Favorites<FaHeart className='favoriteIcon'/></button>
    </div>
  )
}

export default Header