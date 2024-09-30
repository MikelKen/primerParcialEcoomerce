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
      <HorizontalCardProduct category={"jackets"} heading={"top-jackets"}/>
      <HorizontalCardProduct category={"skirts"} heading={"top-skirts"}/>
      <HorizontalCardProduct category={"blazers"} heading={"top-blazers"}/>
      <HorizontalCardProduct category={"coasts"} heading={"top-coats"}/>
      

      <VerticalCardProduct category={"shirtsBlouses"} heading={"Popular Blouses"}/>
      <VerticalCardProduct category={"jeans"} heading={"top-Jeans"}/>
    </div>
  )
}

export default Home