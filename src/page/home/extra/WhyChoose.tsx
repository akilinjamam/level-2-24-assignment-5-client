import whyChoosePic from '../../../images/whyChoose.jpg';
const WhyChoose = () => {
    return (
        <div className={` w-full lg:h-[400px] xsm:h-auto sm:h-auto bg-purple-50 rounded-lg my-6 flex items-center justify-between p-3`}>
            <section className="lg:w-[48%] xsm:w-full h-full xsm:h-auto sm:h-auto">
                <p className="text-gray-700 text-3xl font-bold my-6">Why Choose Us ?</p>
                <hr />
                <p className="text-gray-700 my-3 text-xl font-bold">
                Seamless Booking Experience :
                </p>
                <p className="text-gray-700 my-3">
                At RoomBridge, we make scheduling and reserving your ideal meeting space effortless. With our intuitive platform, finding the perfect room for your needs is just a few clicks away. Enjoy a hassle-free experience, from booking to setup, so you can focus on what matters most—your meeting. Choose us for convenience, flexibility, and peace of mind.
                </p>
               
                <p className="text-gray-700 my-3 text-xl font-bold">
                Secure Transactions :
                </p>
                <p className="text-gray-700 my-3">
                At RoomBridge, we prioritize your financial safety with advanced encryption and secure payment methods. Book with confidence, knowing your information is fully protected.
                </p>
            </section>
            <section className="w-[43%] h-full bg-blue-50 flex items-center justify-center xsm:hidden sm:hidden lg:flex">
                <img style={{borderRadius:'10px'}} width={350} src={whyChoosePic} alt="" />
            </section>
        </div>
    );
};

export default WhyChoose;