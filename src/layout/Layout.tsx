import { ReactNode, useEffect } from "react";
import Navbar from "../nav/nav";
import layout from './Layout.module.css';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken } from "../verifyToken/verifyToken";


interface ILayoutProps {
    children: ReactNode;
  }

const Layout = ({children}:ILayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const token = localStorage.getItem("roomBridgeToken");

    useEffect(() => {
        if(location.slice(0,13) === '/room-detail/' || location === '/booking' || location === '/my-bookings'){
            if(token){
                const userinfo = verifyToken(token) 
                const role = userinfo?.role
                if(role !== 'user'){
                    navigate('/login')
                    toast.error('only user can see detail')
                }
            }else{
                navigate('/login')
                toast.error('login first')
            }
        }
    },[location, navigate, token])




    return (
        <div className={` ${layout.main} lg:w-[1200px] md:w-full sm:w-full xsm:w-full px-3 h-auto m-auto`}>
        <Navbar/>
        <ToastContainer/>
        {children}
        </div>
    );
};

export default Layout;