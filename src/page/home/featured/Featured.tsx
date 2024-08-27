import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import notFound from '../../../images/not-found.png'
import Slider from "react-slick";
// import { countStars } from "./startCount";
import { NavLink} from "react-router-dom";

import { productItems, TProductItem } from "./productItems";
import Button from "../../../components/button/Button";

const Featured = () => {
    
    // const {data: allProducts} = useGetProductsForDashboardQuery('')
    // console.log(allProducts?.data)

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
      };
    const settingsTwo = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
      };

    return (
        <div className="w-full h-[650px] bg-purple-50 rounded-lg my-6 p-3">
            <div className="my-8">
                <p className="text-3xl font-bold text-gray-700 sm:text-center xsm:text-center lg:text-left">FEATURED ROOMS:</p>
            </div>
           {
                productItems?.length > 0
                ?
                <div className="my-6 xsm:hidden sm:hidden lg:block">
                <Slider {...settings}>
                    {
                    
                        productItems?.map((items:TProductItem, index:number) => {
                        return (
                            <div key={index+1}>
                                <div  className="w-[350px] h-[425px] bg-blue-50 p-3 rounded-md">
                                <div className="w-full h-[250px] bg-blue-100 rounded-md mb-3 text-gray-700">
                                        <img style={{width:'400px', height:'250px', borderRadius:'10px'}} src={items.img} alt="" />      
                                </div>
                                <div className="leading-8 text-gray-700 font-bold">
                                    <p>Name: {items.name}</p>
                                    <p>Capacity: {items.capacity}</p>
                                    <p>Price Per Slot : {items.price}</p>
                                    
                                    <NavLink to={`/productDetail/${index+1}`}><button className="w-full bg-purple-600 rounded-lg hover:bg-purple-700 text-white my-2">SEE DETAILS</button></NavLink>
                                </div>
                            </div>
                            </div>
                        )
                        })         
                    }
            </Slider>
                </div>
                :
                <div className="w-full h-[330px] bg-purple-50 my-6 rounded-lg flex items-center justify-center">
                    <img width={400} src={notFound} alt="" />
                 </div>
           }
            <div className="my-6 xsm:block sm:block lg:hidden mx-auto xsm:w-[100%]">
              <Slider {...settingsTwo}>
                    { 
                    
                         productItems?.map((items:TProductItem, index:number) => {
                         return (
                             <div key={index+1}>
                                 <div  className="w-[350px] xsm:w-full sm:w-full h-[485px] bg-blue-50 p-3 rounded-md">
                                 <div className="w-full h-[250px] bg-blue-100 rounded-md mb-3 text-gray-700">
                                        <img className="xsm:w-full sm:w-full lg:w-[400px]" style={{ height:'250px', borderRadius:'10px'}} src={items.img} alt="" />      
                                 </div>
                                 <div className="leading-8 text-gray-700 font-bold">
                                     <p>Name: {items.name}</p>
                                     <p>Capacity: {items.capacity}</p>
                                     <p>Price Per Slot : {items.price}</p>
            
                                     <NavLink to={`/productDetail/${index+1}`}><button className="w-full bg-purple-600 rounded-lg hover:bg-purple-700 text-white my-2">SEE DETAILS</button></NavLink>
                                 </div>
                             </div>
                             </div>
                         )
                         })
                         
                        
                    }
             </Slider>
            </div>
            <div className="my-6 w-full h-[75px] flex items-center justify-center">
               <NavLink to='/products'><Button>All Products</Button></NavLink>
            </div>
        </div>
    );
};

export default Featured;