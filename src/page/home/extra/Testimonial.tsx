import review from '../../../images/customer-review.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import reviews from './Testimonial.module.css';
import { allReviews } from './allReviews';

const Testimonials = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
      };
    return (
        <div className={`${reviews.main} w-full sm:w-full xsm:w-full  h-[450px] xsm:h-auto sm:h-auto flex items-center justify-between my-6 `}>
            <section className="lg:w-[565px] sm:w-fullm-b xsm:w-full h-full  p-3  bg-purple-50 rounded-lg xsm:mb-3 lg:mb-0 md:mb-0">
                <p className='my-6 text-3xl font-bold text-gray-700 sm:text-center xsm:text-center lg:text-left'>CUSTOMER TESTIMONIALS</p>
                <div className='w-full h-[290px] m-auto '>
                    <Slider {...settings}>
                        {
                            allReviews.map(review => {
                                return (
                                    <div className=''>
                                        <div className='h-[200px] w-[200px] m-auto my-6'>
                                            <img className='rounded-full' src={review.img} alt="" />
                                        </div>
                                        <div>
                                            <p className='text-center'>{review.reviews}</p>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>

            </section>
            <section className="w-[590px] h-full bg-purple-50 flex items-center justify-center rounded-lg">
                <img width={400} src={review} alt="" />
            </section>
        </div>
    );
};

export default Testimonials;