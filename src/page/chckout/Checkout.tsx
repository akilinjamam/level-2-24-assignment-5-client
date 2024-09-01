/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../redux/hooks/hooks";
import { useGetAllUserQuery } from "../../redux/auth/authApi";
import AmarPay from "../../components/amarPay/AmarPay";
// import { toast } from "react-toastify";



const Checkout = () => {
  
 

    const {data:allUsers} = useGetAllUserQuery('');

      const {booking} = useAppSelector(state => state);
     

      const selectedSlots = booking.slots.map(item => item.slot)

      const findUsers = allUsers?.data?.find((f:any) => f?._id === booking.user)
      
     

      const addBookingData = {
        date: booking.date,
        slots: selectedSlots,
        room: booking.room,
        user: booking.user,
        totalAmount: booking.totalAmount,
        isConfirmed: booking.isConfirmed
    }

      
    //   const onSubmit = async () => {
       

       
    //     try {
    //        const res =  await addRegistration(data).unwrap();
    //        console.log(res)
    //        if(res){
    //            toast.success(res.message)
    //         //    navigate('/login')
    //        }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error( 'something went wrong')
    //     }
    //   }


    return (
        <div className={`w-full lg:h-auto sm:h-[565px] xsm:h-auto bg-purple-50 rounded-lg p-3 lg:flex lg:items-center lg:justify-between xsm:my-3 sm:my-3 lg:my-0`}>
            
            <section style={{position:'relative'}} className="lg:w-[100%] sm:w-full xsm:w-full h-full rounded-lg p-3 leading-9 ">
                    <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
                        <p  className="text-gray-700 text-3xl font-bold my-6">Checkout:</p>
                        <hr />
                        <p>Room Name: {booking.roomName}</p>
                        <p>Date: {booking.date}</p>
                        <div className="flex">
                            <p>Selected Slots :</p>
                            {
                                booking.slots.map(item => <span className="bg-purple-600 text-white font-bold  px-3 mx-2 rounded-md"> {item.startTime} - {parseInt(item.startTime.slice(0,2)) + 1}:00</span> )
                            }
                        </div>
                        <p>Cost: {booking.totalAmount}</p>
                    
                        <section className="lg:w-[100%] sm:w-full xsm:w-full h-full">
                    <p  className="text-gray-700 text-3xl font-bold my-6">User Information Form:</p>
                    <hr />
                    <br />
                    <form >
                        <input value={findUsers?.name} style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text"  placeholder='type your Name' />
                    
                        <br />
                        <input value={findUsers?.email} style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="email"  placeholder='type your email' />
                        <br />
                    
                        <input value={findUsers?.phone}  style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px] p-1 ' placeholder='type your phone number' />
                        <br />
                        <input value={findUsers?.address}  style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px] p-1 ' placeholder='type your address'/>
                        <br />
                        
                    </form>
                    <br />
                    <br />
                </section>
                    </section>
                
                    <AmarPay booking={addBookingData} userInfo={findUsers}/>
            </section>
        </div>
    );
};

export default Checkout;