import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/cartContext'
import { NavLink } from 'react-router-dom'


export default function Cart() {
  let { getUserCart, removeCart, clearCart, setItemNumber, updateCart } = useContext(CartContext)
  let [cartData, setCartData] = useState(null)
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData() {
    setLoading(true)
    let req = await getUserCart().catch((req) => {
      console.log(req);
      if (req.response.data.statusMsg == 'fail') {
        setCartData(null)
        setLoading(false)

      }
    })
    if (req?.data?.status == "success") {
      setLoading(false)
      setCartData(req.data.data)
    }
  }

  async function removeItemCart(id) {
    let req = await removeCart(id)
    if (req?.data.status == "success") {
      console.log(req);
      setItemNumber(req.data.numOfCartItems)
      setCartData(req.data.data)
    }
  }
  async function clearCartData() {
    let req = await clearCart()
    if (req.data.message == 'success') {
      setCartData(null)
      setItemNumber(req.data.numOfCartItems)


    }
  }
  async function updateCartItem(id, count) {
    let req = await updateCart(id, count)
    if (req?.data.status == "success") {
      console.log(req);
      setCartData(req.data.data)
    }
  }

  return (
    <>
      {loading ? <div className='loading d-flex justify-content-center align-items-center  bg-white position-fixed top-0 end-0 bottom-0 start-0'>
        <span className="loader"></span></div>
        : <>{cartData == null ? <div className='alert alert-danger'>cart Empty</div> :
          <div className='container '>
            <button className='btn btn-danger btn-sm float-end mt-4' onClick={clearCartData}> Empty Cart</button>
            <div className='clearfix'></div>
            {cartData.products.map((el) => {
              return <div className='row py-3 border-bottom border-3 align-items-center '>
                <div className="col-md-10">
                  <div className="row align-items-center">
                    <div className='col-md-1 '>
                      <img src={el.product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-10">
                      <h6>{el.product.title}</h6>
                      <h5 className='text-muted'>price:{el.price}EGP</h5>
                      <button onClick={() => removeItemCart(el.product._id)} className='btn btn-danger '> Remove <i className='fa-solid fa-trash'></i></button>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">

                  <span onClick={() => updateCartItem(el.product._id, el.count += 1)} className='btn btn-success btn-sm'>
                    <i className='fa-solid fa-plus'></i>
                  </span>
                  <span className='mx-2'>
                    {el.count}
                  </span>
                  <span onClick={() => updateCartItem(el.product._id, el.count -= 1)} className='btn btn-danger btn-sm'>
                    <i className='fa-solid fa-minus'></i>
                  </span>
                </div>
              </div >
            })}
            <h3 className='text-main' >Total Price : {cartData.totalCartPrice}</h3>
            <NavLink to={'/checkout/' + cartData._id} className='btn bg-main text-white'>Check out Payment</NavLink>
          </div >
        }
        </>}
    </>
  )
}
