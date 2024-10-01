import React from "react";
import { loadStripe } from "@stripe/stripe-js";

import SummaryApi from "../common";
import { IoIosCloseCircleOutline } from "react-icons/io";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";
import { Form } from "react-router-dom";

const Resevation = ({ onClose, totalPrice, fetchData, totalQty }) => {

    const handleSubmit = async () => {

    
          const dataResponse = await fetch(SummaryApi.saveOrder.url, {
            method: SummaryApi.saveOrder.method,
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            },
            body: JSON.stringify({
             
              amount: totalPrice,
              productDetail: fetchData,
              paymentMethod: "Efectivo",
              state: "Reserved",
              totalQty: totalQty,
            }),
          });
          const data = await dataResponse.json();
          console.log("Respuesta del backend:", data);
    
          if (data.success) {
            toast.success(data.message);
            elements.getElement(CardElement).clear();
            onClose();
          }
    
          if (data.error) {
            toast.error(data.message);
          }
        
      };
    
  console.log("datos de la rese");
  return (
    <div className="fixed w-full bg-slate-400 bg-opacity-35 top-53 left-0 right-0 bottom-40 flex justify-center items-center">
      <div className="bg-indigo-300 p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Reservation Information</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-blue-500 cursor-pointer"
            onClick={onClose}
          >
            <IoIosCloseCircleOutline />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-900">
          <p>Total Price :</p>
          <p>{displayINRCurrency(totalPrice)}</p>
        </div>
        <div className="flex items-center justify-between px-4 gap-4 font-medium text-lg text-slate-900">
          <p>Total Quantity: </p>
          <p>{totalQty}</p>
        </div>

        <Form
          className="grid p-1 gap-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >  

          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Reservation
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Resevation;
