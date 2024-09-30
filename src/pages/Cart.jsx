import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

import TypePayment from "../components/TypePayment";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q4BMqK72xbjo9cJ1Z3c37n0P8PCXVwstrwPSgTDCaWRc26X7vvW188749Ra1DlOYdtnRH9iod1pJTXaVmPGxgE900tj364nJ2"
);

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const  [openTypePayment,setOpenTypePyment] = useState(false)
  //const loadingCart = new Array(4).fill(null)
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const navite = useNavigate();

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    });

    const responseData = await response.json();
    console.log("los datos de cart ",responseData)
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

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();
    console.log("CANTIDAR ",responseData)
    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddCart();
    }
  };
  
  const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
  const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.product?.sellingPrice) ,0)

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
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.product?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>

                    <div className="px-4 py-2 relative">
                      {/**Delete rpoduct */}
                      <div
                        className="absolute right-0 text-blue-600 rounded-full p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.product?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.product?.category}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.product?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.product?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-blue-700 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQty(product?.product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-blue-700 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?.product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
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
              <h2 className="text-white bg-teal-700 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              
  

              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4" onClick={()=>setOpenTypePyment(true)}>
                Pay Order
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4" onClick={()=>setOpenTypePyment(true)}>
                Reserved Order 
              </button>

            </div>
          )}
           {
            openTypePayment && (
              <TypePayment onClose={()=>setOpenTypePyment(false)} totalPrice={totalPrice} fetchData={data} totalQty={totalQty}/>
               )
           }
        </div>
      </div>
    </div>
  );
};

export default Cart;
