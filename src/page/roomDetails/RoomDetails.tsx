/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useNavigate, useParams } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../redux/features/room.api";
import { cart } from "../../icons/icons";
import { useLottie } from "lottie-react";
import loading from '../../animation/loading.json';
import { useState } from "react";

const RoomDetails = () => {
    const [select, setSelect] = useState(0)
    const {roomId} = useParams();
    const navigate = useNavigate()
    
    const {data: rooms, isLoading} = useGetAllRoomsQuery('')

    
  
    const options = {
        animationData: loading,
        loop: true
    }

    const {View} = useLottie(options)
   
    const findRoom = rooms?.data?.find((f:any) => f?._id === roomId )
    console.log(findRoom)
   
    return (
        <div className={`w-full lg:h-auto sm:h-auto xsm:h-auto bg-purple-50 rounded-lg p-3 lg:flex lg:items-baseline lg:justify-between xsm:my-3 sm:my-3 lg:my-0`}>
            { !isLoading
                ?
                <section className="lg:w-[60%] m-auto sm:w-full xsm:w-full h-full  rounded-lg ">
                    <img style={{width:'100%', height:'70%', borderRadius:'10px', marginBottom:'10px'}} src={findRoom?.images[select]} alt="" />

                    <div className="w-full h-[30%] flex items-center justify-between">
                        <img className={`${select === 0 ? 'border border-cyan-500' : ''} cursor-pointer`} onClick={() => setSelect(0)} style={{width:'32%', height:'100%', borderRadius:'10px'}} src={findRoom?.images[0]} alt="" />
                        <img className={`${select === 1 ? 'border border-cyan-500' : ''} cursor-pointer`} onClick={() => setSelect(1)} style={{width:'32%', height:'100%', borderRadius:'10px'}} src={findRoom?.images[1]} alt="" />
                        <img className={`${select === 2 ? 'border border-cyan-500' : ''} cursor-pointer`} onClick={() => setSelect(2)} style={{width:'32%', height:'100%', borderRadius:'10px'}} src={findRoom?.images[2]} alt="" />
                    </div>
                    <br />
               
                    <div>
                        <p>Room Name: {findRoom?.name}</p>
                        <p>Room No: {findRoom?.roomNo}</p>
                        <p>Capacity: {findRoom?.capacity}</p>
                        <p>Price Per Slot: {findRoom?.pricePerSlot}</p>
                        <br />
                            <button onClick={() => navigate(`/booking/${findRoom?._id}`)} className=" w-[100%] flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-lg">
                                <div   className="flex items-center">
                                {cart} <span className="ml-2">Book Now</span>
                                </div>
                            </button>
                    </div>

           
                </section> 
                :
                <div className="m-auto">
                    {View}
                </div>
            } 
        </div>
    );
};

export default RoomDetails;