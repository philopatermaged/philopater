import React from 'react'
import notfound from '../../asset/images/error.svg'

export default function Notfounded() {
  return (
    <div>
      <div className='d-flex  justify-content-center align-items-center'>
        <img src={notfound} alt="" srcset="" className=' w-50  ' />

      </div>

    </div>
  )
}
