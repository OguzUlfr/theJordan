import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {BiHome} from 'react-icons/bi'
import {TbLayout2,TbSlideshow} from 'react-icons/tb'

function LeftBar() {
  return (
    <div className='leftBar'>
        <Link to='/' className='brandAdmin'>
            <div className='brandCard'>
                <div className='brandFront'>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt=''/>
                    ADMIN
                </div>
                <div className='brandBack'><BiHome className='homeIcon'/>Go Home</div>
            </div>
        </Link>
        <ul className='adminList'>
            <NavLink to='/admin' className='listItem'><TbSlideshow className='listIcon'/>Home AD</NavLink>
            <NavLink to='/admin/products' className='listItem'><TbLayout2 className='listIcon'/>Products</NavLink>
        </ul>
    </div>
  )
}

export default LeftBar