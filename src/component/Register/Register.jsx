import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




export default function Register() {
  let navigate = useNavigate()
  let [errMessage, setErrMessage] = useState("")
  let [loading, setloading] = useState(true)

  async function Registerform(value) {
    setloading(false)
    let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", value).catch(function (err) {
      setErrMessage(err.response.data.message)
      setloading(true)

    })
    if (req?.data.message == "success") {
      navigate('/login')
      setloading(true)
    }



  }
  let validation = Yup.object({
    name: Yup.string().required("name is Required").min(3, "min char 3").max(20, "max char 20"),
    email: Yup.string().required("Email is Required").email("enter valid email"),
    password: Yup.string().required("password is Required").matches(/^[A-Z][a-zA-Z!@#$%^&*(0-9]{6,16}$/, "enter valid password"),
    rePassword: Yup.string().required("repassword is Required").oneOf([Yup.ref("password")], "repassword not match"),
    phone: Yup.string().required("phone is required").matches(/^01[1250][0-9]{8}$/, "enter valid phone"),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    onSubmit: Registerform,
    validationSchema: validation
  })

  return (
    <div>
      <h2>Register Now .....</h2>
      {errMessage != "" ? <div className='alert alert-danger'>{errMessage}</div> : ""}
      <form onSubmit={formik.handleSubmit} className='mb-3'>
        <label className='mb-1' htmlFor="name">Name:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name' className='form-control mb-3' />
        {(formik.errors.name && formik.touched.name) ? <div className=' alert alert-danger'>
          {formik.errors.name}
        </div> : ""}

        <label className='mb-1' htmlFor="email">Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
        {(formik.errors.email && formik.touched.email) ? <div className=' alert alert-danger'>
          {formik.errors.email}
        </div> : ""}

        <label className='mb-1' htmlFor="password">Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
        {(formik.errors.password && formik.touched.password) ? <div className=' alert alert-danger'>
          {formik.errors.password}
        </div> : ""}

        <label className='mb-1' htmlFor="rePassword">RePassword:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="Password" id='rePassword' name='rePassword' className='form-control mb-3' />
        {(formik.errors.rePassword && formik.touched.rePassword) ? <div className=' alert alert-danger'>
          {formik.errors.rePassword}
        </div> : ""}

        <label className='mb-1' htmlFor="phone">Phone:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
        {(formik.errors.phone && formik.touched.phone) ? <div className=' alert alert-danger'>
          {formik.errors.phone}
        </div> : ""}

        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white  '> Register  </button>
          : <button type='button' className='btn bg-main text-white  '>
            <i className='fa-solid fa-spinner fa-spin'></i>
          </button>}


      </form>
    </div>
  )
}
