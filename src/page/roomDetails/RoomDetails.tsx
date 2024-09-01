/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useNavigate, useParams } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../redux/features/room.api";
import { cart } from "../../icons/icons";

const RoomDetails = () => {

    const {roomId} = useParams();
    const navigate = useNavigate()
    
    const {data: rooms} = useGetAllRoomsQuery('')

    
  
    // const dispatch = useAppDispatch();

    // const {product} = useAppSelector(state => state.product)
   


    const findRoom = rooms?.data?.find((f:any) => f?._id === roomId )
    console.log(findRoom)
   
    return (
        <div className={`w-full lg:h-[500px] sm:h-auto xsm:h-auto bg-purple-50 rounded-lg p-3 lg:flex lg:items-center lg:justify-between xsm:my-3 sm:my-3 lg:my-0`}>
            <section className="lg:w-[50%] sm:w-full xsm:w-full h-full bg-yellow-100 rounded-lg ">
                <img style={{width:'100%', height:'70%', borderRadius:'10px'}} src={findRoom?.img} alt="" />
                <div>
                    <img style={{width:'25%', height:'30%', borderRadius:'10px'}} src={findRoom?.img} alt="" />
                    <img style={{width:'25%', height:'30%', borderRadius:'10px'}} src={findRoom?.img} alt="" />
                    <img style={{width:'25%', height:'30%', borderRadius:'10px'}} src={findRoom?.img} alt="" />
                    <img style={{width:'25%', height:'30%', borderRadius:'10px'}} src={findRoom?.img} alt="" />
                </div>
            </section>
            <section style={{position:'relative'}} className="lg:w-[49%] sm:w-full xsm:w-full h-full rounded-lg p-3 leading-9 ">
                <p>Room Name: {findRoom?.name}</p>
                <p>Room No: {findRoom?.roomNo}</p>
                <p>Capacity: {findRoom?.capacity}</p>
                <p>Price Per Slot: {findRoom?.pricePerSlot}</p>
                
                    <button onClick={() => navigate(`/booking/${findRoom?._id}`)} style={{position:'absolute', bottom:'10px'}} className=" w-[96%] flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-lg">
                        <div   className="flex items-center">
                        {cart} <span className="ml-2">Book Now</span>
                        </div>
                    </button>

            </section>
        </div>
    );
};

export default RoomDetails;