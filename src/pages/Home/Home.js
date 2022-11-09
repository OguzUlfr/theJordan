import React from 'react'
import './Home.scss'
import Header from '../Header'
import CarouselAd from './Components/CarouselAd'
import History from './Components/History'
import Category from './Components/Category'
import VerticalAD from './Components/VerticalAD'

function Home() {
  return (
    <>
      <Header/>
      <div className='home'>
            <CarouselAd/>
            <History/>
            <Category/>
            <VerticalAD/>
      </div>
    </>
  )
}

export default Home