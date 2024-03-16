import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import img1 from '../../asset/images/slider-image-1.jpeg'
import img2 from '../../asset/images/slider-image-2.jpeg'
import img3 from '../../asset/images/slider-image-3.jpeg'

export default function () {
    return (
        <div className='row g-0 mt-5'>
            <div className='col-md-9'>
                <OwlCarousel items={1} loop autoplay autoplayTimeout={2000}>
                    <div className='item'>
                        <img src={img1} alt="" className='w-100' height={500} />

                    </div>
                    <div className='item'>
                        <img src={img2} alt="" className='w-100' height={500} />

                    </div>
                    <div className='item'>
                        <img src={img3} alt="" className='w-100' height={500} />

                    </div>

                </OwlCarousel>

            </div>
            <div className='col-md-3'>
                <img src={img2} alt="" className='w-100' height={250} />
                <img src={img3} alt="" className='w-100' height={250} />
            </div>
        </div>

    )
}
