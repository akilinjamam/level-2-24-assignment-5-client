import { ReactNode, useEffect } from "react";
import layout from './Layout.module.css';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken } from "../verifyToken/verifyToken";
import Navbar from "../nav/nav";


interface ILayoutProps {
    children: ReactNode;
  }

const AdminLayout = ({children}:ILayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const token = localStorage.getItem("roomBridgeToken");

    useEffect(() => {
        if(location === '/dashboard'){
            if(token){
                const userinfo = verifyToken(token) 
                const role = userinfo?.role
                if(role !== 'admin'){
                    navigate('/')
                    toast.error('only admin can get Access')
                }
            }else{
                navigate('/login')
                toast.error('login first')
            }
        }
    },[location, navigate, token])

    return (
        <div className={` ${layout.main} lg:w-[1300px] md:w-full sm:w-full xsm:w-full px-3 h-[500px] m-auto`}>
        <Navbar/>
        <ToastContainer/>
        {children}
        </div>
    );
};

export default AdminLayout;