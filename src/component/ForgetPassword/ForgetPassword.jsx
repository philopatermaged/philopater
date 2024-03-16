import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgetPassword() {
    let [errmsg, setErr] = useState('')
    let [formStatus, setFormStatus] = useState(true)
    let navigate = useNavigate()

    let validationSchema = Yup.object({
        email: Yup.string().required("Email is Required").email("enter valid email"),
    })
    let validationSchema2 = Yup.object({
        resetcode: Yup.string().required("resetcode is Required").matches(/^[0-9]{5,6}$/, 'enter valid code'),
    })
    let Formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: ForgetPasswordAPi,
        validationSchema

    })

    let Formik2 = useFormik({
        initialValues: {
            resetCode: ''
        },
        onSubmit: verifyResetCode,
        validationSchema: validationSchema2
    })

    async function verifyResetCode(value) {
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value).catch((err) => {
            setErr(err.response.data.message)
        })

        if (req.data.status == 'Success') {
            navigate('/ResetPassword')
        }
    }


    async function ForgetPasswordAPi(value) {
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotpasswords', value).catch((err) => {
            setErr(err.response.data.message)
        })
        if (req.data.statusMsg == 'success') {
            setFormStatus(false)
        }
    }


    return (
        <div>
            {errmsg ? <div className='alert-danger alert'>{errmsg} </div> : ''}
            {formStatus ?
                <form onSubmit={Formik.handleSubmit}>
                    <label htmlFor="email"> Enter Your Email </label>
                    <input type="email" onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control mt-3' id='email' name='email' />
                    <button type='submit' className='btn mt-3 bg-main text-white' >Send</button>
                </form> :
                <form onSubmit={Formik2.handleSubmit}>
                    <label htmlFor="resetCode"> Rest code </label>
                    <input value={Formik2.values.resetCode} onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} type="text" className='form-control mt-3' id='resetCode' name='resetCode' />
                    {Formik2.errors.resetCode && Formik2.touched.resetCode ? <div className='alert alert-danger'> {Formik2.errors.resetCode} </div> : ''}
                    <button type='submit' className='btn mt-3 bg-main text-white' > Virefy code </button>
                </form>}
        </div>
    )
}
