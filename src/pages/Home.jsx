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
      <HorizontalCardProduct category={"jerseis"} heading={"Ropa Popular"}/>
      <VerticalCardProduct category={"blazers"} heading={"Blazers Elegantes"}/>
      <HorizontalCardProduct category={"jeans"} heading={"Jeans Destacados"}/>
      <VerticalCardProduct category={"coats"} heading={"Abrigos Recomendados"}/>
      <HorizontalCardProduct category={"jackets"} heading={"Chaquetas Modernas"}/>
      <VerticalCardProduct category={"shorts"} heading={"Shorts Favoritos"}/>
      <HorizontalCardProduct category={"skirts"} heading={"Faldas de Moda"}/>
      

      <VerticalCardProduct category={"zendas"} heading={"Tendencias de Moda"}/>
      <VerticalCardProduct category={"caps"} heading={"Gorras Destacadas"}/>
      <VerticalCardProduct category={"wads"} heading={"Complementos Modernos"}/>
      <VerticalCardProduct category={"tops"} heading={"Tops Populares"}/>
    </div>
  )
}

export default Home