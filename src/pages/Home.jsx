import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"clothes"} heading={"top-clotes"}/>
      <HorizontalCardProduct category={"jeans"} heading={"top-Jeans"}/>
      

      <VerticalCardProduct category={"shirtsBlouses"} heading={"Popular Blouses"}/>
      <VerticalCardProduct category={"jeans"} heading={"top-Jeans"}/>
    </div>
  )
}

export default Home