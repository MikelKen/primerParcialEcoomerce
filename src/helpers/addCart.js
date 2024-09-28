import { toast } from "react-toastify"
import SummaryApi from "../common"

const addToCart = async (e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        headers: {
            Accept: "application/json",
           "content-type" : "application/json",
           Authorization: `Bearer ${localStorage.getItem("authorization")}`,
         },
         body : JSON.stringify(
            {productId:id}
         )
    })

    const responseData = await response.json()
console.log("addtocart : ",responseData)
    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }

    return responseData
}

export default addToCart