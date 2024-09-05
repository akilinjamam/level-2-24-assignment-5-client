import { ReactNode, useEffect } from "react";
import layout from './Layout.module.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken } from "../verifyToken/verifyToken";
import Navbar from "../nav/nav";
import Modal from "../components/modal/Modal";


interface ILayoutProps {
    children: ReactNode;
  }

const AdminLayout = ({children}:ILayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const token = localStorage?.getItem("roomBridgeToken");

    useEffect(() => {
        if(location === '/dashboard'){
            if(token){
                const userinfo = verifyToken(token) 
                const role = userinfo?.role
                if(role !== 'admin'){
                    toast.error('only admin can get Access')
                    navigate('/')
                }
            }else{
                navigate('/login')
                toast.error('login first')
            }
        }
    },[location, navigate, token])

    return (
        <div className={` ${layout.main} lg:w-[1300px] md:w-[700px] sm:w-full xsm:w-full px-3 h-[520px] m-auto relative`}>
        <Navbar/>
        <ToastContainer/>
        <Modal/>
        {children}
        </div>
    );
};

export default AdminLayout;