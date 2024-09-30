import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";
import { MdStreetview } from "react-icons/md";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDelails] = useState({
      id : "",
      user : "",
      total : "",
      dateOrder: "",
      orderItems:"",
      state: ""
    })
  
    const fetchAllOrders = async () => {
      const fetchData = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        headers: {
          Accept: "application/json",
          "content-type": "application/json",  
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      });
  
      const dataResponse = await fetchData.json();
      console.log("todos los Ordenes::::: ",dataResponse)
  
      if (dataResponse.success) {
        setAllOrders(dataResponse.data);
      }
  
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
  
      console.log("res data : ", dataResponse);
    };
  
    useEffect(() => {
      fetchAllOrders();
    },[]);
    
  const stateClasses = {
    Reserved: 'bg-yellow-200 text-yellow-800 rounded-full',
    Confirmed: 'bg-green-200 text-green-800 rounded-full',
    Canceled: 'bg-red-200 text-red-800',
  }
    return (
      <div className="bg-white pb-4">
        <table className="w-full userTable text-center">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th>Nro.</th>
              <th>Customer</th>
              <th>State</th>
              <th>Payment Method</th>
              <th>Amount Product</th>
              <th>Total</th>
              <th>Order Date</th>
              <th>Order Items</th>
            </tr>
          </thead>
          <tbody className="">
            {allOrders.map((el, index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.user?.name}</td>
                  <td className={stateClasses[el.state] || 'text-black'}>{el?.state}</td>
                  <td>{el?.paymentMethod}</td>
                  <td>{el?.totalQty}</td>
                  <td>{el?.total}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white" onClick={()=>{
                        setUpdateUserDelails(el)
                        setOpenUpdateRole(true)
                      }}
                      >
                      <MdStreetview/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          openUpdateRole && (
            <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
            />
          )
        }
      </div>
    );
}

export default AllOrders