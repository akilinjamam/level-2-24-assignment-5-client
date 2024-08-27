import { bookingTwo, clock, select } from '../../../icons/icons';
import howWorks from '../../../images/howWorks.jpg';
import extras from './extra.module.css'
const HowWorks = () => {
    return (
        <div className={`${extras.main} w-full h-[400px] bg-purple-50 rounded-lg my-6 flex items-center justify-between p-3`}>
            <section className="lg:w-[43%]  xsm:hidden sm:hidden lg:flex h-full bg-blue-50 flex items-center justify-center">
                <img style={{borderRadius:'10px'}} width={460} src={howWorks} alt="" />
            </section>
            <section className="lg:w-[48%] h-full sm:w-full xsm:w-full">
                <p className="text-gray-700 text-3xl font-bold my-6">How It Works </p>
                <hr />
                <p className="text-gray-700 my-3 w-[120px] font-bold">
                <span className='flex items-center justify-between'>{select}  Select a Room :</span>
                </p>
                <p className="text-gray-700 my-3">
                <span className='text-sm'> Go to Meeting Room page. then choose your Favorite Room</span>
                </p>
                <p className="text-gray-700 my-3 w-[158px] font-bold">
                <span className='flex items-center justify-between'>{clock}  Choose Date & Time :</span>
                </p>
                <p className="text-gray-700 my-3">
                <span className='text-sm'>Then Select Time Slot from options and then choose date and time</span>
                </p>

                <p className="text-gray-700 my-3 w-[136px] font-bold">
                <span className='flex items-center justify-between'>{bookingTwo}  Confirm Booking :</span>
                </p>
                <p className="text-gray-700 my-3">
                <span className='text-sm'>After following previous step click to booking option. keep remide, before booking, ensure you are logged in. then you will get payment option.After payment you will get a success page with confirmation</span>
                </p>
                
            </section>
        </div>
    );
};

export default HowWorks;