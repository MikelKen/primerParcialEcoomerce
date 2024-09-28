import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { FiSearch } from "react-icons/fi";
import { PiUserCircleFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context =useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  console.log("este es el user en el header :",user)
  const handleLogout = async () => {
    const fethData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
    });
    const data = await fethData.json();

    if (data.success) {
      localStorage.clear();
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none pl-2"
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-500 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {
              user?.id && (
              <div className="text-4xl cursor-pointer" onClick={()=>setMenuDisplay(preve=>!preve)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name}/>
                ) : (
                  <PiUserCircleFill />
                )}
            </div>
              )
            }

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {
                    user?.role === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-products"}className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 " onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                    )
                  }
                </nav>
              </div>
            )}
          </div>

          {
            user?.id && (
              <Link to={"/cart"} className="text-2xl relative">
                <span><FaShoppingCart /></span>
                
                <div className='bg-blue-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
              </Link>

            )
          }

          <div>
            {user?.id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
