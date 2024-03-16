import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/cartContext'

export default function Login() {
  let [numItem, setItemNumber] = useState()
  let { getUserCart } = useContext(CartContext)

  let { setToken } = useContext(UserContext)
  let navigate = useNavigate()
  let [errMessage, setErrMessage] = useState("")
  let [loading, setloading] = useState(true)


  let validation = Yup.object({
    email: Yup.string().required("Email is Required").email("enter valid email"),
    password: Yup.string().required("password is Required").matches(/^[A-Z][a-zA-Z!@#$%^&*(0-9]{6,16}$/, "enter valid password"),
  })

  let form1 = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    onSubmit: loginuser,
    validationSchema: validation
  })

  async function loginuser(value) {
    setloading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value).catch((err) => {
      setErrMessage(err.response.data.message)
      setloading(true)

    })
    if (req.data.message == 'success') {
      setloading(true)
      setToken(req.data.token)
      localStorage.setItem('userToken', req.data.token)
      getUserData()
      navigate('/home')
    }  
  }


  async function getUserData() {
    let req = await getUserCart().catch((err) => { })
    if (req?.data?.status == 'success') {
      setItemNumber(req.data.numOfCartItems)
    }
  }

  return (
    <div>
      <h2>Login Now .....</h2>
      {errMessage != "" ? <div className='alert alert-danger'>{errMessage}</div> : ""}
      <form onSubmit={form1.handleSubmit} className='mb-3'>

        <label className='mb-1' htmlFor="email">Email:</label>
        <input onBlur={form1.handleBlur} onChange={form1.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
        {(form1.errors.email && form1.touched.email) ? <div className=' alert alert-danger'>
          {form1.errors.email}
        </div> : ""}

        <label className='mb-1' htmlFor="password">Password:</label>
        <input onBlur={form1.handleBlur} onChange={form1.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
        {(form1.errors.password && form1.touched.password) ? <div className=' alert alert-danger'>
          {form1.errors.password}
        </div> : ""}
        <a href='/ForgetPassword'>ForgetPassword</a>
        <br></br>
        <br></br>
        {loading ? <button disabled={!(form1.isValid && form1.dirty)} type='submit' className='btn bg-main text-white  '> Login  </button>
          : <button type='button' className='btn bg-main text-white  '>
            <i className='fa-solid fa-spinner fa-spin'></i>
          </button>}

      </form>
    </div>
  )
}
