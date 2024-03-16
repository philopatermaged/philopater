import React from 'react'
import Login from '../Login/Login'
import HOME from '../home/Home'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouting({children}) {



    if (localStorage.getItem('userToken') != null) {

        return children

    } else {
        return <Navigate to='/Login' />
    }







}
