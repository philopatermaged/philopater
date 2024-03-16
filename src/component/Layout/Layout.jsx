import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/UserContext'
import { useContext } from 'react'
import { CartContext } from '../../Context/cartContext'



export default function Layout() {

  let { getUserCart, setItemNumber } = useContext(CartContext)
  let { setToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setToken(localStorage.getItem('userToken'))
      getUserData()
    }


  }, [])

  async function getUserData() {
    let req = await getUserCart().catch((err) => {
      console.log(err);
    })
    if (req?.data?.status == 'success') {
      setItemNumber(req.data.numOfCartItems)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='container my-5 pt-3'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
