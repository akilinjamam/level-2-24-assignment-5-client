// import contactus from '../../images/contactus.jpg'
import { useLottie } from 'lottie-react';
import registrationAnim from '../../animation/registration.json';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegistrationMutation } from '../../redux/auth/authApi';

type Inputs = {
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
  }


const Registration = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()

      const [addRegistration] = useRegistrationMutation()

      

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        try {
           const res =  await addRegistration(data).unwrap();
           console.log(res)
        } catch (error) {
            console.log(error)
        }
      }
    const options = {
        animationData: registrationAnim,
        loop: true
    }

    const {View} = useLottie(options)
    return (
        <div className={`w-full h-auto bg-purple-50 rounded-lg my-6 lg:flex lg:items-center lg:justify-between p-3`}>
        <section className="lg:w-[46%] sm:w-full xsm:w-full h-full bg-blue-50 flex items-center justify-center">
            {/* <img style={{borderRadius:'10px'}} width={450} src={contactus} alt="" /> */}
            {View}
        </section>
        <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
            <p  className="text-gray-700 text-3xl font-bold my-6">Registration Form:</p>
            <hr />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text" {...register("name")} placeholder='type your Name' />
                {errors.name && <span>This field is required</span>}
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="email" {...register("email")} placeholder='type your email' />
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text"  {...register("password")} placeholder='type password' />
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px] p-1 ' placeholder='type your phone number' {...register("phone")}/>
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px] p-1 ' placeholder='type your address' {...register("address")}/>
                <br />
                <input className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
            </form>
        </section>
    </div>
    );
};

export default Registration;