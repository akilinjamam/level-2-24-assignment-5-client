/* eslint-disable @typescript-eslint/no-explicit-any */
// import room from './Room.module.css';
import { NavLink } from "react-router-dom";
import {  TProductItem } from "../home/featured/productItems";
import Button from "../../components/button/Button";
import myBookings from './MyBookings.module.css';
import { verifyToken } from "../../verifyToken/verifyToken";
import { useGetMyBookingQuery } from "../../redux/features/booking.api";
import loadingAnim from '../../animation/loading.json';
import { useLottie } from "lottie-react";


const MyBookings = () => {

    const options = {
        animationData: loadingAnim,
        loop: true
    }


    const {View} = useLottie(options)


    const token = localStorage.getItem("roomBridgeToken");

    const getUserInfo = verifyToken(token as string);

    const {data:bookings} = useGetMyBookingQuery('');

    const findUsers = bookings?.data?.filter((f:any) => f?.user?.email === getUserInfo?.email )
    const findName = bookings?.data?.find((f:any) => f?.user?.email === getUserInfo?.email )


    console.log(findUsers)
   
   
    return (
        <div className={`${myBookings.main}`}>
            <div className="w-full h-[50px] bg-purple-50 rounded-md flex items-center justify-start px-2 font-bold">
                <p>MY BOOKINGS: {findName?.user?.name ? findName?.user?.name : 'Loading..'}</p>
            </div>
            <div>
                { findUsers
                    ?
                    findUsers?.map((item:TProductItem, index:number) => {
                        return (
                            <div key={index+1} className={`${myBookings.partOne} lg:w-full xsm:w-full sm:w-full lg:h-[330px] xsm:h-auto sm:h-auto bg-purple-50 rounded-lg my-6 p-3 flex items-center justify-between`}>
                                <section className="lg:w-[30%] xsm:w-full sm:w-full  h-full  rounded-lg ">
                                    <img className="xsm:block sm:block xsm:mx-auto sm:mx-auto" style={{width:'400px', height:'300px', borderRadius:'10px',}} src={item?.room?.images[0]} alt="" />
                                </section>
                                <section className="w-[69%] h-full  rounded-lg leading-8 p-3 text-gray-700">
                                    <p>Room Name: {item?.room?.name}</p>
                                    <p>User Name: {item?.user?.name}</p>
                                    <p>Date: {item?.date}</p>
                                    <p>Time: {item?.slots?.map((item:any) => <span>{item?.startTime} - {item?.endTime}, </span> )}</p>
                                    <p>Date: {item?.isConfirmed}</p>
                                    
                                    <NavLink to={`/room-detail/${item?.room?._id}`}><Button>Details</Button></NavLink>
                                    
                                </section>
                            </div>
                        )
                    })
                    :
                    <div className="w-full h-[400px] bg-purple-50 p-2 my-6 flex items-center justify-center">
                        <div className="w-[200px]">{View}</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default MyBookings;


