import React, {useContext, useState} from 'react'
import loginIcons from '../assets/gifLogin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [shadowPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email : "",
        password :""
    })

    const navigate = useNavigate()
    const { fetchUserDetails,fetchUserAddCart } = useContext(Context)
    
    const handleOnChange = (e) => {
        const { name, value } = e.target
        
        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
          
            headers : {
                Accept: "application/json",
                "Content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()
        console.log("dataApi: ",dataApi)
        if(dataApi.success){
            localStorage.setItem("authorization", dataApi.data);
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
            fetchUserAddCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

    console.log("data login", data)

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-[130px] h-[130px]  mx-auto'>
                    <img src={loginIcons} alt='login icons' />
                </div>
                <form className='pt-6 flex flex-col' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-200 p-2'>
                            <input 
                            type='email' 
                            placeholder='enter email'
                            name='email'
                            value={data.email} 
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-200 p-2 flex'>
                            <input 
                            type={shadowPassword ? "text" : "password"} 
                            placeholder='enter password' 
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-x1' onClick={()=>setShowPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        shadowPassword ? (
                                            <FaEyeSlash/>
                                        ):(
                                            <FaEye/>
                                        ) 
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-blue-500'>
                            Forgot Password ?
                        </Link>
                    </div>

                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                <p className='my-4'>Don't have account ? <Link to={"/sign-up"} className='text-blue-500 hover:text-blue-600 hover:underline'>Sign Up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login