import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import  Header  from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'


function App() {
  const dispatch = useDispatch()

  const fetchUserDetails = async()=>{
    const token = localStorage.getItem('authorization')
    
    if(!token){
      console.error('token not found')
      return
    }
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      headers: {
         Accept: "application/json",
        "content-type" : "application/json",
        authorization: localStorage.getItem("authorization"),
      }
    })
    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  return (
    <>
        <Context.Provider value={{
            fetchUserDetails
        }}>
          <ToastContainer/>
          <Header/>
          <main className='min-h-[calc(10vh-10px)]'>
            <Outlet/>
          </main>
          <Footer/>

        </Context.Provider>
    </>
  )
}

export default App
