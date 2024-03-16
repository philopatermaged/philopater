import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword() {
    let navigate = useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().required("Email is Required").email("enter valid email"),
        newPassword: Yup.string().required("newPassword is Required").matches(/^[A-Z][a-zA-Z!@#$%^&*(0-9]{6,16}$/, "enter valid newPassword"),
    })


    let form = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },

        onSubmit: ResetPassword,
        validationSchema
    })



    async function ResetPassword(val) {
        let req = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', val)

        if (req.data.token) {
            navigate('/login')
        }

    }

    return (
        <div>

            <h2>ResetPassword</h2>

            <form onSubmit={form.handleSubmit} className='mb-3'>

                <label className='mb-1' htmlFor="email">Email:</label>
                <input onBlur={form.handleBlur} onChange={form.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
                {(form.errors.email && form.touched.email) ? <div className=' alert alert-danger'>
                    {form.errors.email}
                </div> : ""}

                <label className='mb-1' htmlFor="newPassword">newPassword:</label>
                <input onBlur={form.handleBlur} onChange={form.handleChange} type="Password" id='newPassword' name='newPassword' className='form-control mb-3' />
                {(form.errors.newPassword && form.touched.newPassword) ? <div className=' alert alert-danger'>
                    {form.errors.newPassword}
                </div> : ""}
            </form>

        </div>
    )
}
