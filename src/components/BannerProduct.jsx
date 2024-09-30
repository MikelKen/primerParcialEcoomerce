import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/banner-1.jfif'
import image2 from '../assets/banner/banner-2.jfif'
import image3 from '../assets/banner/banner-3.jfif'
import image4 from '../assets/banner/banner-4.jfif'
import image5 from '../assets/banner/banner-5.jpg'
import image6 from '../assets/banner/banner-6.jfif'
import image7 from '../assets/products/boots/coats-1..webp'


import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrenteImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        image5,
        image6,
        image7
    ]
    const mobileImages = [
        image4,
        image5,
        image6,
    ]

    const nextImage =() =>{
        if(desktopImages.length -1 >currentImage){
            setCurrenteImage(preve=>preve+1)
        }
    }
    const preveImage =() =>{
        if(currentImage != 0){
            setCurrenteImage(preve=>preve-1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length -1 >currentImage){
                nextImage()
            }else {
                setCurrenteImage(0)
            }
        },5000)
        return ()=> clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='h-60 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2x1'>                    
                    <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button>
                </div>
            </div>

            {/**desktop and table */}
            <div className='hidden md:flex h-full w-full overflow-hidden'>
            {
                desktopImages.map((imageUrl, index) => {  
                    return (
                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                        <img src={imageUrl} className='w-full h-full'/>
                    </div>
                    )      
                })
            }
            </div>
            
            {/**mobile */}
            <div className=' flex h-full w-full overflow-hidden md:hidden'>
            {
                desktopImages.map((imageUrl, index) => {  
                    return (
                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                        <img src={imageUrl} className='w-full h-full object-cover'/>
                    </div>
                    )      
                })
            }
            </div>
        </div>
    </div>
  )
}

export default BannerProduct