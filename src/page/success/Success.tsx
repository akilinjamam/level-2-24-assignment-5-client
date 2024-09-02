/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLottie } from 'lottie-react';
import successAnim from '../../animation/success.json';
import { NavLink, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import { useGetMyBookingQuery } from '../../redux/features/booking.api';

const Success = () => {

    const {successId} = useParams();
    console.log('userId:', successId)

    const options = {
        animationData : successAnim,
        loop:true,
    }

    const {data} = useGetMyBookingQuery('');
   

    const findBooking = data?.data?.find((f:any) => f?._id === successId );

   


    const {View} =useLottie(options)
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="w-[700px] h-[400px] ">
                <div className="w-full h-[245px] bg-purple-100 flex items-center justify-center">       
                    <div className='w-[300px]'>{View}</div>
                </div>
                <div className="w-full h-auto bg-purple-100 mt-2 p-2">
                  <p className='pb-2'>Your Payment is successfully Done!</p>
                  <hr />
                  <p>Name: {findBooking?.user?.name}</p>
                  <p>Room Name: {findBooking?.room?.name}</p>
                  <p>Floor No: {findBooking?.room?.floorNo}</p>
                  <p>Room No: {findBooking?.room?.roomNo}</p>
                  <p>Slot: {findBooking?.slots?.map((item:any) => <span>{item?.startTime}-{parseInt(item?.startTime?.slice(0,2)) + 1 }:00, </span> )}</p>
                  <p>Price: {findBooking?.totalAmount * findBooking?.slots?.length} </p>
                </div>
                <div className="w-full h-[50px] bg-purple-100 mt-2 flex items-center justify-end px-2">
                    <NavLink to="/"><Button>HOME</Button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Success;