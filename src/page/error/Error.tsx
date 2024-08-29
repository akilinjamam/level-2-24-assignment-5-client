import { useLottie } from 'lottie-react';
import errorAnim from '../../animation/error.json'
import Button from '../../components/button/Button';
import { NavLink } from 'react-router-dom';
const Error = () => {
    const options = {
        animationData: errorAnim,
        loop: true
    }

    const {View} = useLottie(options)
    return (
        <div>
            <div className="w-full h-[500px] bg-purple-50 rounded-md flex items-center justify-center my-6">
            {View}
            
            </div>
            <div className="w-full h-[50px] bg-purple-50 rounded-md flex items-center justify-end px-3">
                <div className='w-[150px] h-auto flex items-center justify-between'>
                    <Button>Logout</Button>
                    <NavLink to="/"><Button>Home</Button></NavLink>
                </div>
            </div>

        </div>
    );
};

export default Error;