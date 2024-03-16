import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { CartContext } from '../../Context/cartContext'
import Swal from 'sweetalert2'
export default function HOME() {
  let { addCart, setItemNumber } = useContext(CartContext)

  let [page, setPage] = useState(1)
  function getProducts(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`)
  }
  let { isLoading, isError, isFetching, data, refetch } = useQuery(['productsApi', page], getProducts)

  function getPageNumber(event) {
    let page = event.target.getAttribute('pageNum')
    setPage(page)
    // getProducts(page)
  }
  // let [ProductList, setProductList] = useState([])
  // let [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   getAllProduct()
  // }, [])

  // async function getAllProduct() {
  //   setLoading(true)
  //   let req = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   console.log(req);
  //   setProductList(req.data.data)
  //   setLoading(false)
  // }
  async function AddToCart(id) {
    let req = await addCart(id).catch((err => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }))

    if (req?.data.status == 'success') {
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

      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <div className='container-fluid mt-5'>
        <div className='row g-3'>
          {
            isLoading ? <div className='loading d-flex justify-content-center align-items-center  bg-white position-fixed top-0 end-0 bottom-0 start-0'>
              <span className="loader"></span>
            </div> : data?.data.data.map((element) => {
              return <div key={element.id} className='col-md-2'>
                <div className='product cursor-pointer' >
                  <Link to={`/ProductDetails/${element.id}`}>
                    <img src={element.imageCover} className='w-100' alt="" />
                    <h6 className=' text-main'>{element.category.name}</h6>
                    <h5>{element.title.split(' ').slice(0, 2).join(' ')}</h5>
                    <div className='d-flex justify-content-between'>
                      <span>{element.price}EGP</span>
                      <span><i className='fa-solid fa-star rating-color'></i>{element.ratingsAverage}</span>
                    </div>
                  </Link>
                  <button onClick={() => { AddToCart(element.id) }} className='btn bg-main text-white d-block w-100'>Add to Cart</button>
                </div>
              </div>
            })}

        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center my-5">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" pageNum='1' onClick={getPageNumber}>1</a></li>
            <li className="page-item"><a className="page-link" pageNum='2' onClick={getPageNumber} >2</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div >
    </>
  )
}
