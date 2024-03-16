import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../asset/images/freshcart-logo.svg'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { jwtDecode } from 'jwt-decode'
import { CartContext } from '../../Context/cartContext'


export default function Navbar() {
  let { numItem } = useContext(CartContext)
  let { userToken, data, setToken } = useContext(UserContext)
  let navigate = useNavigate()
  function Logout() {
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home"> <img src={logo} /> </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {userToken != null ?
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="home">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="products">products</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="category">categories</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="cart">cart</NavLink>
                </li>
              </ul> : ''}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item d-flex align-items-center">
                <i className='fa-brands fa-facebook mx-2'></i>
                <i className='fa-brands fa-twitter mx-2'></i>
                <i className='fa-brands fa-instagram mx-2'></i>
                <i className='fa-brands fa-youtube mx-2'></i>
                <i className='fa-brands fa-pinterest mx-2'></i>

              </li>
              {userToken != null ? <li className="nav-item d-flex">
                <div className='position-relative'>
                  <NavLink to='cart'>
                    <i className='fa-solid text-main nav-link fa-cart-shopping'></i>
                  </NavLink>
                  <span className='position-absolute top-0 end-0 translate-middle-y'>{numItem}</span>
                </div>
                <span className="nav-link cursor-pointer" onClick={Logout}>{data?.name} Logout</span>
              </li> : <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="login">login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="register">register</NavLink>
                </li>   </>}
            </ul>

          </div>
        </div>
      </nav >
    </div >
  )

}



