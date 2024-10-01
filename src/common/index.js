const BASE_URL = "https://parcialecoomerce.onrender.com"//"http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${BASE_URL}/auth/signup`,
        method : "post"
    },
    signIn : {
        url : `${BASE_URL}/auth/signin`,
        method : "post" 
    },
    current_user : {
        url : `${BASE_URL}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${BASE_URL}/api/userLogout`,
        method : "get"
    },
    allUser : {
        url : `${BASE_URL}/api/all-user`,
        method : "get"
    },
    updateUser : {
        url : `${BASE_URL}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${BASE_URL}/api/upload-product`,
        method: "post"
    },
    allProduct : {
        url : `${BASE_URL}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${BASE_URL}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${BASE_URL}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWireProduct : {
        url : `${BASE_URL}/api/category-product`,
        method : "post"
    },
    productDetails : {
        url : `${BASE_URL}/api/product-details`,
        method : "post"
    },
    addToCartProduct : {
        url : `${BASE_URL}/api/addtocart`,
        method : "post"
    },
    addToCartProductCount : {
        url : `${BASE_URL}/api/countAddToCartProduct`,
        method : "get"
    },
    addToCartProductView :{
        url : `${BASE_URL}/api/view-card-product`,
        method : "get"
    },
    updateCartProduct : {
        url : `${BASE_URL}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${BASE_URL}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${BASE_URL}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${BASE_URL}/api/filter-product`,
        method : 'post'
    },
    saveOrder : {
        url: `${BASE_URL}/api/save-order`,
        method : 'post'
    },
    allOrders : {
        url : `${BASE_URL}/api/all-orders`,
        method : 'get'
    },
    orderDetail: {
        url : `${BASE_URL}/api/order-detail`,
        method : 'post'
    },
    saveReserved : {
        user : `${BASE_URL}/api/save-reserved`,
        method: 'post'
    }

}

export default SummaryApi