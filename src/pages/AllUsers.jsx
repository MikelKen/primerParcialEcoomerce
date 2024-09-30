import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
  const [updateUserDetails,setUpdateUserDelails] = useState({
    email : "",
    name : "",
    role : "",
    _id: ""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    });

    const dataResponse = await fetchData.json();
    console.log("todos los usuarios::::: ",dataResponse)

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }

    console.log("res data : ", dataResponse);
  };

  useEffect(() => {
    fetchAllUsers();
  },[]);
  

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable text-center">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUser.map((el, index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('LL')}</td>
                <td>
                  <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white" onClick={()=>{
                      setUpdateUserDelails(el)
                      setOpenUpdateRole(true)
                    }}
                    >
                    <FaEdit/>
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
};

export default AllUsers;
