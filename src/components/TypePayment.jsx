import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SummaryApi from "../common";
import { IoIosCloseCircleOutline } from "react-icons/io";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51Q4BMqK72xbjo9cJ1Z3c37n0P8PCXVwstrwPSgTDCaWRc26X7vvW188749Ra1DlOYdtnRH9iod1pJTXaVmPGxgE900tj364nJ2"
);

const CheckoutForm = ({
    onClose,
    totalPrice,
    fetchData,
    totalQty
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

 
    if(!error){
        const {id}= paymentMethod

    
        const dataResponse = await fetch(SummaryApi.saveOrder.url,{
            method : SummaryApi.saveOrder.method,
            headers: {
              Accept: "application/json",
              "content-type" : "application/json",
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            },
            body : JSON.stringify({
                id:id,
                amount: totalPrice,
                productDetail: fetchData,
                paymentMethod: "Card",
                state: "Confirmed",
                totalQty: totalQty
            })
        })
        const data = await dataResponse.json();
        console.log("Respuesta del backend:", data);

        if(data.success){
            toast.success(data.message)
            elements.getElement(CardElement).clear()
            onClose()
        }

        if(data.error){
            toast.error(data.message)
        }
        
    }
  };

  console.log("el precio total ",totalPrice)
  return (
<form className="grid p-6 gap-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto" onSubmit={handleSubmit}>
  
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-semibold mb-2">
      Payment Information
    </label>
    <div className="border border-gray-300 rounded-lg p-4 shadow-inner">
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              '::placeholder': {
                color: '#a0aec0',
              },
            },
            invalid: {
              color: '#fa755a',
            },
          },
        }}
      />
    </div>
  </div>

  <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
    Payment
  </button>

</form>
  );
};

const TypePayment = ({
    onClose,
  totalPrice,
  fetchData,
  totalQty
  
}) => {
    console.log("el fechdata::::::::: ",fetchData)

  return (
    <div className='fixed w-full bg-slate-400 bg-opacity-35 top-53 left-0 right-0 bottom-40 flex justify-center items-center'>
    <div className='bg-indigo-300 p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
      <div className='flex justify-between items-center pb-3'>
        <h2 className='font-bold text-lg'>Payment Information</h2>
        <div className='w-fit ml-auto text-2xl hover:text-blue-500 cursor-pointer' onClick={onClose}>
          <IoIosCloseCircleOutline/>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-900">
           <p>Total Price</p>
           <p>{displayINRCurrency(totalPrice)}</p>
       </div>
       <div  className="mt-6">
        <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} onClose={onClose} fetchData={fetchData}totalQty={totalQty}/>
        </Elements>     

       </div>
    </div>
    
  </div>
  );
};

export default TypePayment;
