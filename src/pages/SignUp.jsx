import React ,{useState}from 'react'
import loginIcons from '../assets/gifLogin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {
    const [shadowPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email : "",
        password :"",
        name: "",
        confirmPassword:"",
        profilePic: "",
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        
        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadPic = async(e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)
        
        setData((preve)=>{
            return{
                ...preve,
                profilePic : imagePic
            }
        })
    }

    const handleSubmit = async(e )=>{
        e.preventDefault()

        if(data.password === data.confirmPassword){
            const dataReponse = await fetch(SummaryApi.signUP.url,{
                method : SummaryApi.signUP.method,
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
    
            const dataApi = await dataReponse.json()
            //para los mensajes 
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
        } else {
            toast.error("Please check and confirm password")
        }
    }


  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-[120px] h-[120px]  mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt='login icons' />
                    </div>
                    <form >
                        <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                </div>
                <form className='pt-4 flex flex-col' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Name : </label>
                        <div className='bg-slate-200 p-2'>
                            <input 
                            type='text' 
                            placeholder='enter your name'
                            name='name'
                            value={data.name} 
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-200 p-2'>
                            <input 
                            type='email' 
                            placeholder='enter email'
                            name='email'
                            value={data.email} 
                            onChange={handleOnChange}
                            required
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
                            required
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
                    </div>

                    <div>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-200 p-2 flex'>
                            <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder='enter confirm password' 
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-x1' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                <span>
                                {
                                    showConfirmPassword ? (
                                        <FaEyeSlash/>
                                    ):(
                                        <FaEye/>
                                    ) 
                                }
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                </form>
                <p className='my-4'>Already have account ? 
                    <Link to={"/login"} className='text-blue-500 hover:text-blue-600 hover:underline'>Login</Link>
                </p>
            </div>
        </div>
    </section>
  )
}

export default SignUp