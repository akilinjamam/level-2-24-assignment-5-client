import { serviceItems } from "./serviceItems";
import service from './Sevices.module.css';

const Service = () => {
    return (
        <div className="w-[100%] h-[310px] xsm:h-auto my-6 bg-purple-50 p-3 rounded-lg">
            <div className="mb-10 my-6 text-gray-700 text-3xl">
                <p className="font-bold xsm:text-center sm:text-center lg:text-left">OUR SERVICES</p>
            </div>
            <div className={`flex items-center justify-between ${service.container}`}>
                {
                    serviceItems.map((items, index) => {
                        return (
                            <div style={{backgroundColor: `${items.bgColor}`}} key={index+1} className={`w-[250px] xsm:w-full sm:w-full h-[150px] rounded-xl p-5 sm:m-5 xsm:m-5`}>
                               <p className="mb-5">{items.logo}</p>
                               <p>{items.title}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Service;