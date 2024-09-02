import { toast } from "react-toastify";
import { useAddBookingMutation, useAddPaymentMutation } from "../../redux/features/booking.api";

export type IPaymentData = {
    total_amount: number;
    CUS_name: string;
    CUS_email: string;
    CUS_phone: number;
    CUS_add1: string;
    bookingId?: string;
  };
  

/* eslint-disable @typescript-eslint/no-explicit-any */
const AmarPay = ({ booking, userInfo}: {booking: any, userInfo:any}) => {
    // const navigation = useNavigate();
   
    console.log(userInfo)
    console.log(booking)

    const userData:IPaymentData = {
            total_amount: booking?.totalAmount,
            CUS_name: userInfo?.name,
            CUS_email: userInfo?.email,
            CUS_add1: userInfo?.address,
            CUS_phone: userInfo?.phone
    }

    const [addBooking] = useAddBookingMutation()
    const [addPayment] = useAddPaymentMutation()

    const handlePayment = async () => {
        console.log(booking)

        try {
            const res = await addBooking(booking).unwrap();
            console.log('booking response:', res);
            if(res?.statusCode === 200){
                toast.success('booking successfully done')
                const paymentInfoData = {
                    ...userData,
                    bookingId: res?.data?._id
                }

               const paymentResponse = await addPayment(paymentInfoData).unwrap();
               if(paymentResponse?.statusCode === 200){
                    window.location.href = paymentResponse?.data;
               }
               console.log('payment response :',paymentResponse)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <button onClick={handlePayment} style={{position:'absolute', bottom:'10px'}} className=" w-[98%] flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-lg">
                        <div className="flex items-center">
                         <span className="ml-2">Confirm Booking</span>
                        </div>
        </button>
    );
};

export default AmarPay;