import { ReactNode } from "react";



const Button = ({children, data}: {data?:ReactNode, children: string}) => {
    return   <button className="py-1 px-3 bg-purple-600 rounded-xl my-10 text-white font-bold">{data && data} {children}</button>
};

export default Button;