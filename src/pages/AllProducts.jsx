import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {

  const  [openUploadProduct,setUploadProduct] = useState(false)


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'> 
        <h2 className='font-bold text-lg'> All product</h2>
        <button className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all py-1 px-3 rounded-full'onClick={()=>setUploadProduct(true)}>Update Product</button>
      </div>

      {/**upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setUploadProduct(false)}/>
        )
      }
    </div>
  )
}

export default AllProducts