import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/home/Home'
import Products from './component/products/Products'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Categories from './component/Categories/Categories'
import Notfounded from './component/Notfounded/Notfounded'
import Cart from './component/Cart/Cart'
import { UserContext, UserContextProvider } from './Context/UserContext'
import ProtectedRouting from './component/ProtectRouting/ProtectedRouting'
import ForgetPassword from './component/ForgetPassword/ForgetPassword'
import ResetPassword from './component/ResetPasswrod/ResetPassword'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { CartContextProvider } from './Context/cartContext'
import AllOrders from './component/Allorders/Allorders'
import Checkout from './component/Checkout/Checkout'






export default function App() {

  let QueryClients = new QueryClient()

  let routes = createHashRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: 'home', element: <ProtectedRouting> <Home /> </ProtectedRouting> },
        { path: 'products', element: <ProtectedRouting> <Products /> </ProtectedRouting> },
        { path: 'checkout/:id', element: <ProtectedRouting> <Checkout /> </ProtectedRouting> },
        { path: 'allorders', element: <ProtectedRouting> <AllOrders /> </ProtectedRouting> },
        { path: 'login', element: <Login /> },
        { path: 'ProductDetails/:id', element: <ProtectedRouting> <ProductDetails />  </ProtectedRouting> },
        { path: 'ForgetPassword', element: <ForgetPassword /> },
        { path: 'ResetPassword ', element: <ResetPassword /> },
        { index: true, element: <Register /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfounded /> },
        { path: 'category', element: <ProtectedRouting>  <Categories /></ProtectedRouting> },
        { path: 'cart', element: <ProtectedRouting> <Cart /> </ProtectedRouting> },

      ]
    },
  ])

  let { setToken } = useContext(UserContext)
  useEffect(() => {

    if (localStorage.getItem('userToken') != null) {
      setToken(localStorage.getItem('userToken'))
    }
  }, [])


  return (
    <>

      <QueryClientProvider client={QueryClients}>
        <ReactQueryDevtools> </ReactQueryDevtools>
        <CartContextProvider>
          <RouterProvider router={routes}> </RouterProvider>
        </CartContextProvider>
      </QueryClientProvider>





    </>

  )

}
