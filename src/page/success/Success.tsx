import { useLottie } from 'lottie-react';
import successAnim from '../../animation/success.json';
import { NavLink, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';

const Success = () => {

    const {successId} = useParams();
    console.log('userId:', successId)

    const options = {
        animationData : successAnim,
        loop:true,
    }


    const {View} =useLottie(options)
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="w-[400px] h-[500px] ">
                <div className="w-full h-[445px] bg-purple-100 flex items-center justify-center">       
                    {View}
                </div>
                <div className="w-full h-[50px] bg-purple-100 mt-2 flex items-center justify-end px-2">
                    <NavLink to="/"><Button>HOME</Button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Success;