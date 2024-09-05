/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { cart } from "../../icons/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetAllSlotsQuery } from "../../redux/features/slot.api";
import { useState } from "react";
import { useGetAllUserQuery } from "../../redux/auth/authApi";
import { verifyToken } from "../../verifyToken/verifyToken";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { useGetAllRoomsQuery } from "../../redux/features/room.api";
import { addBookings } from "../../redux/features/booking.slice";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
type Inputs = {
    date: string;
    email: string;
    password: string;
    phone: number;
    address: string;
  }

type TAddSlots = {
    slot: string;
    startTime: string;
}

const Bookings = () => {
    const navigate = useNavigate();
    const {bookingId} = useParams();

    const [dateHolder, setDateHolder] = useState('');
  
    const [addSlots, setAddSlots] = useState<TAddSlots[]>([])
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()

      const {data:allSlots, isLoading} = useGetAllSlotsQuery('')
    //   console.log(allSlots)
      const {data:users} = useGetAllUserQuery('')
      const {data:allRoms} = useGetAllRoomsQuery('')

      
     

      const token = localStorage.getItem("roomBridgeToken");
      const getUserEmail = verifyToken(token as string);


      const findUser = users?.data?.find((f:any) => f?.email === getUserEmail?.email)
      const findRooms = allRoms?.data?.find((f:any) => f?._id === bookingId);
    

      const findSlotsForRoom = allSlots?.data?.filter((f:any) => f?.room?._id === bookingId);


      const findSlotsByDate = findSlotsForRoom?.filter((f:any) => f?.date === dateHolder)

      const allSlotsAccordingToRoom = findSlotsForRoom?.map((f:any) => f?.date);

      const showUniqueDate = [...new Set(allSlotsAccordingToRoom)];

      console.log(showUniqueDate)
      
      const dispatch = useAppDispatch()

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
      
        setDateHolder(data.date)
      }

      const addSelectedSlotsAndTimes = (valueId:string, valueStartTime:string) => {

        const checkSlotExist = addSlots?.find(f => f.slot === valueId)

        if(!checkSlotExist){
            setAddSlots(slot => [...slot, {slot: valueId, startTime:valueStartTime}])
        }
      }

      const removeSelectedSlot = (removedId:string) => {
            const removeSlot = addSlots?.filter(f => f.slot !== removedId)
            setAddSlots(removeSlot)    
      }

      const booked = (bookedId:any) => {
        const check = addSlots?.some(item => item.slot === bookedId);

        return check ? 'bg-green-600' : 'bg-purple-600'
      }

    const handleCheckout = () => {

        const bookingData = {
            date: dateHolder,
            slots: addSlots,
            room: bookingId,
            user: findUser?._id,
            totalAmount: findRooms?.pricePerSlot * addSlots.length,
            isConfirmed:'unconfirmed',
            roomName: findRooms?.name
        }

       

        if(bookingData.date && bookingData.slots.length !== 0 && bookingData.room && bookingData.user && bookingData.totalAmount && bookingData.isConfirmed){
            dispatch(addBookings(bookingData))
            navigate(`/checkout/${bookingId}`)
        }else{
            toast.error('please select date and choose slot')
        }

    }

    return (
        <div className={`w-full lg:h-auto sm:h-[565px] xsm:h-auto bg-purple-50 rounded-lg p-3 lg:flex lg:items-center lg:justify-between xsm:my-3 sm:my-3 lg:my-0`}>
            
            <section style={{position:'relative'}} className="lg:w-[100%] sm:w-full xsm:w-full h-full rounded-lg p-3 leading-9 ">
            <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
                <p  className="text-gray-700 text-3xl font-bold my-6">Booking Form:</p>
            <hr />
            <br />
            <div className="lg:w-[200%] sm:w-auto  h-[auto] bg-purple-100 rounded-md p-2">
                <p className="ml-3">Available Dates for this Room : </p>
                <div className="flex items-center">
                    
                    {
                        isLoading ?

                         <p>Loading..</p>
                         :
                         <div>
                            { showUniqueDate?.length > 0
                                ?
                                showUniqueDate?.map((item:any) => <p className="bg-purple-600 text-white mx-2 py-1 px-2 rounded-md">{item}</p> )
                                :
                                <p className="text-red-600 ml-3">Not Available</p>
                            }
                         </div>
                    }
                </div>
            </div>
            <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input  style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="date" {...register("date")}  />
                    {errors.date && <span>This field is required</span>}
                    <br />
                    <div className="flex flex-wrap lg:w-[200%] md:w-[100%] h-auto bg-purple-100 rounded-md">
                        {  (dateHolder)
                            ?
                            
                            <div className="flex flex-wrap">
                                { findSlotsByDate?.length > 0
                                    ?
                                    findSlotsByDate?.map((item:any) => (
                                        <div>
                                            <div onDoubleClick={() => removeSelectedSlot(item?._id)} onClick={() => addSelectedSlotsAndTimes(item?._id, item?.startTime)} className={`w-[100px] h-[40px] ${booked(item?._id)} rounded m-2 cursor-pointer flex items-center justify-center p-2`}>
                                                <div className="w-full flex items-center justify-between text-white font-bold">
                                                    <p>{item.startTime}</p>
                                                    <p>{item.endTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <p className="ml-2">{isLoading ? 'loading...' : 'Slot Not Found in this Date'}</p>
                                }
                            </div>
                            :

                            <p className="ml-2">please select Date to show slot for this room</p>
                        }
                    </div>
                    <br />
                    <input className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="Find Slot" />
                </form>
                <section className="lg:w-[100%] sm:w-full xsm:w-full h-full">
            <p  className="text-gray-700 text-3xl font-bold my-6">User Information Form:</p>
            <hr />
            <br />
            <form >
                <input value={findUser?.name ? findUser?.name : 'loading...'} style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text"  placeholder='type your Name' />
               
                <br />
                <input value={findUser?.email ? findUser?.email : 'loading...' } style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="email"  placeholder='type your email' />
                <br />
               
                <input value={findUser?.phone ? findUser?.phone : 'loading...'} style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px] p-1 ' placeholder='type your phone number' />
                <br />
                <input value={findUser?.address ? findUser?.address : 'loading...'} style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px] p-1 ' placeholder='type your address'/>
                <br />
                
            </form>
            <br />
            <br />
        </section>
            </section>
                
                    <button onClick={handleCheckout} style={{position:'absolute', bottom:'10px'}} className=" w-[96%] flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-lg">
                        <div className="flex items-center">
                        {cart} <span className="ml-2">Checkout</span>
                        </div>
                    </button>

            </section>
        </div>
    );
};

export default Bookings;