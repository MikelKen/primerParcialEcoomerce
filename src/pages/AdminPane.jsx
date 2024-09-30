import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PiUserCircleFill } from "react-icons/pi";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from "../common/role";

const AdminPane = () => {
  const user = useSelector(state => state?.user?.user);

  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN){
      navigate("/")
    }
  },[user])

  return (
       <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-64 shadow-xl"> {/* Incrementamos la sombra */}
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-4xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full shadow-md" // Agregamos sombra a la imagen del perfil
                alt={user?.name}
              />
            ) : (
              <PiUserCircleFill className="text-gray-400" /> // Color gris para icono vacío
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid p-4 space-y-4">
            <Link
              to={"all-users"}
              className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg shadow-md hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-300"
            >
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg shadow-md hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-300"
            >
              All Products
            </Link>
            <Link
              to={"all-orders"}
              className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg shadow-md hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-300"
            >
              All Orders
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-4 shadow-inner bg-gray-50"> {/* Sombra interna para el contenido */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPane;
