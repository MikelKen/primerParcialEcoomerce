import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';

const DetailOrder = () => {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    //const context = useContext(Context);
     const  [openTypePayment,setOpenTypePyment] = useState(false)
  //const loadingCart = new Array(4).fill(null)
  const loadingCart = new Array(Context.cartProductCount).fill(null);
  //const navite = useNavigate();

  const fetchData = async () => {
    const response = await fetch(SummaryApi.orderDetail.url, {
      method: SummaryApi.orderDetail.method,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
      body: JSON.stringify(id)
    });

    const responseData = await response.json();
    console.log("los dettlle de productos ",responseData)
    if (responseData.success) {
      setData(responseData.data);
      console.log("data de cart000000000: ",responseData.data)
    }
  };

  const handleLoaging =async()=>{
    await fetchData()
  }
  useEffect(() => {
    setLoading(true)
    handleLoaging()
    setLoading(false)

  }, []);




  return (
    <div className="container mx-auto">
    <div className="text-center text-lg my-3">
      {data.length === 0 && !loading && (
        <p className="bg-white py-5">No Data</p>
      )}
    </div>

    <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
      {/**view product */}
      <div className="w-full max-w-3xl">
        {loading
          ? loadingCart?.map((el, index) => {
              return (
                <div
                  key={el + "Detail Order Loading" + index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              );
            })
          : data?.items?.map((product, index) => {
              return (
                <div
                  key={product?.id + "Add To Cart Loading"}
                  className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>

                  <div className="px-4 py-2 relative">
                    {/**Delete rpoduct */}
                    <div
                      className="absolute right-0 text-blue-600 rounded-full p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                  
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.name}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.price)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        Total : 
                        {displayINRCurrency(
                          product?.price * product?.quantity
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                    <p className="capitalize text-slate-500">
                      Quantity : 
                    </p>
                      <span>{product?.quantity}</span>
                    
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

              {/**Summary*/}
        <div className="mt-5 lg:mt-0 w-full max-w-sm border p-4">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-white  border">
              <h2 className="text-white bg-teal-700 px-4 py-1 text-center">Order detail data</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Customer Name</p>
                <p>{data.userName}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{data.total}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>State</p>
                <p>{data.state}</p>
              </div>
              
  



            </div>
          )}
          
        </div>

 
    </div>
  </div>
  );
}

export default DetailOrder