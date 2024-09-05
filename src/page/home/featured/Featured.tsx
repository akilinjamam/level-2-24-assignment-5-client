import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import notFound from '../../../images/not-found.png'
import Slider from "react-slick";
// import { countStars } from "./startCount";
import { NavLink} from "react-router-dom";

import { TProductItem } from "./productItems";
import Button from "../../../components/button/Button";
import { useGetAllRoomsQuery } from "../../../redux/features/room.api";

const Featured = () => {
    
    const {data: allRooms} = useGetAllRoomsQuery('')
    console.log(allRooms?.data)

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
                allRooms?.data?.length > 0
                ?
                <div className="my-6 xsm:hidden sm:hidden lg:block">
                <Slider {...settings}>
                    {
                    
                        allRooms?.data?.slice(0,6)?.map((items:TProductItem, index:number) => {
                        return (
                            <div key={index+1}>
                                <div  className="w-[350px] h-[425px] bg-blue-50 p-3 rounded-md">
                                <div className="w-full h-[250px] bg-blue-100 rounded-md mb-3 text-gray-700">
                                        <img style={{width:'400px', height:'250px', borderRadius:'10px'}} src={items?.images[0]} alt="" />      
                                </div>
                                <div className="leading-8 text-gray-700 font-bold">
                                    <p>Name: {items.name}</p>
                                    <p>Capacity: {items.capacity}</p>
                                    <p>Price Per Slot : {items.pricePerSlot}</p>
                                    
                                    <NavLink to={`/room-detail/${items?._id}`}><button className="w-full bg-purple-600 rounded-lg hover:bg-purple-700 text-white my-2">SEE DETAILS</button></NavLink>
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
                    
                         allRooms?.data?.slice(0,6)?.map((items:TProductItem, index:number) => {
                         return (
                             <div key={index+1}>
                                 <div  className="w-[350px] xsm:w-full sm:w-full h-[450px] bg-blue-50 p-3 rounded-md">
                                 <div className="w-full h-[250px] bg-blue-100 rounded-md mb-3 text-gray-700">
                                        <img className="xsm:w-full sm:w-full lg:w-[400px]" style={{ height:'250px', borderRadius:'10px'}} src={items.images[0]} alt="" />      
                                 </div>
                                 <div className="leading-8 text-gray-700 font-bold">
                                     <p>Name: {items.name}</p>
                                     <p>Capacity: {items.capacity}</p>
                                     <p>Price Per Slot : {items.pricePerSlot}</p>
            
                                     <NavLink to={`/room-detail/${items?._id}`}><button className="w-full bg-purple-600 rounded-lg hover:bg-purple-700 text-white my-2">SEE DETAILS</button></NavLink>
                                 </div>
                             </div>
                             </div>
                         )
                         })
                         
                        
                    }
             </Slider>
            </div>
            <div className="my-6 w-full h-[75px] flex items-center justify-center">
               <NavLink to='/room'><Button>All Rooms</Button></NavLink>
            </div>
        </div>
    );
};

export default Featured;