import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


/* eslint-disable @typescript-eslint/no-explicit-any */
const AmarPay = ({ booking, userInfo}: {booking: any, userInfo:any}) => {
    // const navigation = useNavigate();
    const sandboxUrl = 'https://sandbox.aamarpay.com/index.php';

    console.log(userInfo)
    console.log(booking)

    const formData = { cus_name: userInfo?.name, cus_email: userInfo?.email, cus_phone: userInfo?.phone, amount: booking.totalAmount }

    const uploadAbleData = new FormData();


    const handlePayment = async () => {
        console.log('hello')
        console.log(formData)

        const data = {
            
            store_id: "aamarpaytest",
            tran_id: Math.floor(Math.random()*10000),
            success_url: `https://level-2-24-assignment-5-client.vercel.app/success/${userInfo?._id}`,
            fail_url: "fail/example",
            cancel_url: "cancel/example",
            currency: "BDT",
            signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
            desc: "Description",
            cus_add1: "Dhaka",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "0",
            cus_country: "Bangladesh",
            type: "json"
        }


        const newData:any = { ...data, ...formData };
        for (const x in newData) {
            uploadAbleData.append(x, newData[x]);
        }

        try {
            const response = await axios.post(sandboxUrl, uploadAbleData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = await response.data;
            console.log('response:', data)
                if(data.payment_url){
                    window.location.href = data.payment_url
                }
           
        } catch (error) {
            const err:any = error
            console.log(err);
            toast.error(err)
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