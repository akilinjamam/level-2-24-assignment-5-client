// import contactus from '../../images/contactus.jpg'
import { useLottie } from 'lottie-react';
import loginAnim from '../../animation/login.json';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../redux/auth/authApi';
import { toast } from 'react-toastify';

type Inputs = {
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
  }

  type ErrorResponse = {
    data: {
      message: string;
    };
  };

const Login = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()

      const [addLogin] = useLoginMutation()

      

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        try {
           const res=  await addLogin(data).unwrap() 
           console.log(res);
           if(res){
             localStorage.setItem('roomBridgeToken', JSON.stringify(res.token))
             toast.success(res.message)
             
           } 
        
        } catch (error) {
            const err = error as ErrorResponse;
            toast.error(err.data.message)
        }
      }
    const options = {
        animationData: loginAnim,
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
            <p  className="text-gray-700 text-3xl font-bold my-6">Login Form:</p>
            <hr />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="email" {...register("email")} placeholder='type your email' />
                {errors.email && <span>This field is required</span>}
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text"  {...register("password")} placeholder='type password' />
                <br />
                <input className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
            </form>
        </section>
    </div>
    );
};

export default Login;