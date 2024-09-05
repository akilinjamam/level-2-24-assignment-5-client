import hero from './Hero.module.css';
import meetingRoom from '../../../images/metting-room-for-hero-section.jpg';
import { Typewriter } from 'react-simple-typewriter'
import { NavLink } from 'react-router-dom';
import { world } from '../../../icons/icons';
const Hero = () => {
    return (
        <div className={`${hero.main} w-full h-[545px] my-6 bg-purple-50 rounded-lg flex items-center justify-between`}>
           <section className="w-[620px] xsm:w-full sm:w-full h-full  p-3">
                <div className='w-[85%] sm:w-full xsm:w-full h-full  rounded-lg '>
                    <p className={`${hero.gradiantText} text-4xl font-bold my-10 lg:text-left xsm:text-center sm:text-center`}>Book Your Ideal Meeting Room with Ease.</p>
                    <p className='text-xl font-bold mb-10 text-gray-500 lg:text-left xsm:text-center sm:text-center'>
                        <Typewriter
                        words={['Efficient, hassle-free room booking for all your meeting needs.']}
                        loop={true}
                        cursor
                        cursorStyle='_'
                        typeSpeed={30}
                        deleteSpeed={30}
                        delaySpeed={3000}
                    />
                    </p>
                    <p className='text-gray-500 mb-10 leading-7'>
                    RoomBridge is a dynamic company specializing in providing efficient and modern meeting room solutions. We offer a seamless experience for booking and managing conference spaces, designed to meet the needs of businesses of all sizes. At RoomBridge, our goal is to bridge the gap between convenience and functionality, ensuring that every meeting is a success.
                    </p>
                   <NavLink to='/room'>
                        <button className='w-[130px] bg-purple-600 text-white font-bold px-3 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-between'>{world} BOOK NOW</button>
                   </NavLink>
                </div>
           </section>
           <section className="lg:w-[600px] xsm:w-full sm:w-full h-full -100 flex items-center justify-center lg:mr-[-22px]">
                <img className='rounded-lg' width={330} src={meetingRoom} alt="" />
                
           </section>
        </div>
    );
};

export default Hero;