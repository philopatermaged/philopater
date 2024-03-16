import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/cartContext'
import Swal from 'sweetalert2'


export default function ProductDetails() {
    let { addCart, setItemNumber } = useContext(CartContext)
    let params = useParams()
    let [productId, setProductID] = useState()
    useEffect(() => {

        // let imgs = document.querySelectorAll('.imgs')
        // imgs.forEach((el) => {
        //     el.addEventListener('click', function (event) {
        //         let imgPath = event.target.getAttribute('src')
        //         document.querySelector("#myImage").setAttribute('src', imgPath)
        //     })
        // })
        setProductID(params.id)
    }, [])

    function getSrc(event) {
        let imgPath = event.target.getAttribute('src');

        document.querySelector("#myImage").setAttribute('src', imgPath)

    }
    let { data, isLoading } = useQuery(['productDetails', productId], getDetails)

    let product = data?.data.data

    function getDetails(query) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${query.queryKey[1]}`)
    }

    async function AddToCart(id) {
        let req = await addCart(id).catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        })
        if (req.data.status == 'success') {
            setItemNumber(req.data.numOfCartItems)
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            });
        }

    }


    return (
        <>
            {isLoading ? <div className='loading d-flex justify-content-center align-items-center  bg-white position-fixed top-0 end-0 bottom-0 start-0'>
                <span className="loader"></span>
            </div> :
                <div className='container py-5'>
                    <div className='row align-items-center'>
                        <div className='col-md-3'>

                            <div className="row g-1 align-items-center">
                                <div className="col-md-2">
                                    {product.images.map((element) => {
                                        return <img src={element} onClick={getSrc} className='w-100 imgs mt-2' alt="" />
                                    })}

                                </div>
                                <div className="col-md-10">
                                    <img src={product.imageCover} id='myImage' className='w-100' alt="" />

                                </div>
                            </div>
                        </div>
                        <div className='col-md-9'>
                            <h2>{product.title}</h2>
                            <p className='text-muted my-3'>{product.description}</p>
                            <h6 className='text-main'>{product.category.name}</h6>
                            <div className='d-flex justify-content-between'>
                                <span>{product.price}EGP</span>
                                <span><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage} </span>
                            </div>
                            <button onClick={() => AddToCart(product.id)} className='btn bg-main text-white d-block w-100 my-3'>Add to Cart</button>

                        </div>
                    </div>
                </div>}

        </>
    )
}
