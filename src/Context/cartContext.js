import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export function CartContextProvider({ children }) {
    let [numItem, setItemNumber] = useState()

    function getUserCart() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', options)
    }
    
    async function addCart(productId) {

        let body = {
            productId: productId
        }
        let headersOptions = {
            headers: {
                token: localStorage.getItem("userToken")

            }
        }
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", body, headersOptions)
    }

    function removeCart(id) {
        let headersOptions = {
            headers: {
                token: localStorage.getItem("userToken")

            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, headersOptions)
    }

    function clearCart() {
        let headersOptions = {
            headers: {
                token: localStorage.getItem("userToken")

            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, headersOptions)
    }

    function updateCart(id, count) {
        let headersOptions = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            count: count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, headersOptions)
    }

    function checkoutPayment(id, data) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, body, options)
    }

    return <CartContext.Provider value={{ checkoutPayment, updateCart, removeCart, clearCart, getUserCart, addCart, numItem, setItemNumber }}>
        {children}
    </CartContext.Provider>
}   