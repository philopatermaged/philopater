import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { CartContext } from '../../Context/cartContext'

export default function Checkout() {
    let { checkoutPayment } = useContext(CartContext)
    let validationSchema = Yup.object({
        phone: Yup.string().required('Phone Required').matches(/^01[0152][0-9]{8}$/, 'enter valid phone'),
        city: Yup.string().required('City Required').matches(/^[\w-]{3,}$/, 'enter valid city'),
        details: Yup.string().required('Details Required').matches(/^[\w-]{3,}$/, 'enter valid details'),
    })
    let data = useParams()
    let formik = useFormik({
        initialValues: {
            phone: '',
            city: '',
            details: '',
        },
        onSubmit: checkoutpay,
        validationSchema
    })

    async function checkoutpay(val) {
        let req = await checkoutPayment(data.id, val)
        if (req.data.status == "success") {
            // window.location.href = req.data.session.url
            window.open(req.data.session.url, '_self')
        }

    }

    return (
        <div className='w-75 mx-auto my-5' >
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' placeholder='enter city' name='city' />
                    {formik.touched.city && formik.errors.city ?
                        <p className='text-danger'>{formik.errors.city}</p>
                        : ""}
                </div>
                <div className='mb-3'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control' placeholder='enter phone' name='phone' />
                    {formik.touched.phone && formik.errors.phone ?
                        <p className='text-danger'>{formik.errors.phone}</p>
                        : ""}
                </div>
                <div className='mb-3'>
                    <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='enter details' name='details' > </textarea>
                    {formik.touched.details && formik.errors.details ?
                        <p className='text-danger'>{formik.errors.details}</p>
                        : ""}
                </div>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white d-block w-100'>Pay<i className='fa-brands fa-cc-visa mx-2'></i></button>
            </form>
        </div>
    )
}