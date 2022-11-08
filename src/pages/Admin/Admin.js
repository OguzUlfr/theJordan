import React from 'react'
import './Admin.scss'
import {Routes,Route,Link, NavLink} from 'react-router-dom'

import ScrollingAd from './Content/ScrollingAd.js'
import Products from './Content/Products'
import {BiHomeAlt} from 'react-icons/bi'


function Admin() {
  return (
    <div className='Container'>

        <div className='leftBar'>
            <div className='leftBarIcon'>
                <img src={process.env.PUBLIC_URL + '/logo.png'} alt=''/>
                <span>ADMIN</span>
            </div>
            <ul className='leftBarList'>
                <NavLink to='/ad' className={({ isActive }) => (isActive ? 'leftBarListItem activeListItem' : 'leftBarListItem')}>Scrolling Ad</NavLink>
                <NavLink to='/products' className={({ isActive }) => (isActive ? 'leftBarListItem activeListItem' : 'leftBarListItem')}>Products</NavLink>
            </ul>
            <Link to='/' className='leftBarHomeButton'><BiHomeAlt className='homeButton'/>Home Page</Link>
        </div>

        <div className='ContentBox'>
            <Routes>
                <Route path='/admin/ad' element={<ScrollingAd/>}/>
                <Route path='/admin/products' element={<Products/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default Admin