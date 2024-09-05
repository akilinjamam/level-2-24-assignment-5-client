/* eslint-disable @typescript-eslint/no-explicit-any */
import viewBooking from './AdminBooking.module.css';
import loadingAnim from '../../../animation/loading.json';
import { useLottie } from "lottie-react";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { controllModal } from "../../../redux/features/modal.slice";
import { useGetAdminBookingQuery, useUpdateBookingMutation } from "../../../redux/features/booking.api";
import { toast } from "react-toastify";

const AdminBooking = () => {

    const dispatch = useAppDispatch();
    const options = {
        animationData: loadingAnim,
        loop: true
    }

    const {View} = useLottie(options)

    const {data:allBookings, isLoading} = useGetAdminBookingQuery('');
    console.log(allBookings) 

    const [updateBooking] = useUpdateBookingMutation()

    const handleBooking = async (data:string, id: string) => {

        const updatedData = data === 'confirmed' ? 'unconfirmed' : 'confirmed';

        const newData = {
            isConfirmed: updatedData,
        };
        const newBodyData = {
            data: newData,
            id
        };

        console.log(newBodyData)

        try {
            const res = await updateBooking(newBodyData).unwrap();
            if(res.success){
                toast.success(res.message)
            }

        } catch (error) {
            console.log(error);
            toast.error('something is wrong')
        }
    }


    return (
        <div className={`w-full ${viewBooking}`}>
            <div className="w-full h-[60px] flex items-center justify-between">
                <span className="font-bold">Total Bookings : {allBookings?.data?.length ? allBookings?.data?.length : 'loading...'}</span>

            </div>
            <hr />
            { !isLoading
                ?
                <div className={`${viewBooking.tableContainer}`}>
                    <table>
                    <tr>
                        <th>Room Name</th>
                        <th>User Name</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    { 
                        allBookings?.data?.map((booking:any) => (
                            <tr>
                                <td>{booking?.room?.name}</td>
                                <td>{booking?.user?.name}</td>
                                <td>{booking?.date}</td>
                                <td>{booking?.isConfirmed}</td>
                                <td className="flex items-center justify-around">
                                    <button onClick={() => handleBooking(booking?.isConfirmed, booking?._id)} className={`text-sm px-2 py-1  text-white rounded md ml-2 ${booking?.isConfirmed === 'confirmed' ? 'bg-red-600' : 'bg-green-600'}`}>{booking?.isConfirmed === 'confirmed' ? 'Reject' : 'Approve'}</button>

                                    <button onClick={() => dispatch(controllModal({open:true, id:booking?._id, name: booking?.room?.name, type: "booking"}))} className="text-sm px-2 py-1 bg-red-600 text-white rounded md ml-2">DELETE</button>
                                </td>
                            </tr>
                        ))  
                    }
               
                    </table>
                </div>
                :
                <div className="w-full h-[300px] flex items-center justify-center">
                        <div className="w-[200px]">{View}</div>
                </div>
            }
    
        </div>
    );
};

export default AdminBooking;