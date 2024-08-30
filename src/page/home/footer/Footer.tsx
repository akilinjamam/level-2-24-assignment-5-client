
import { socialIcons } from "./socialIcons";
import footer from './Footer.module.css';
import { NavLink } from "react-router-dom";
import { navManuRoutes } from "../../../nav/navMenuRoute";

const Footer = () => {
    const date = new Date();
    return (
        <div className="w-full lg:h-auto bg-purple-200 rounded-lg my-6">
            <div style={{borderRadius:'10px 10px 0 0'}} className={`${footer.main} w-full lg:h-[200px] sm:h-auto xsm:h-auto  bg-purple-100 p-3 flex justify-between items-center my-6`}>
            <section className="lg:w-[350px]  xsm:w-[50%] sm:w-[50%] lg:h-full xsm:h-auto sm:h-auto">
                <p className="font-bold text-xl mb-3">All Navigations:</p>
                {
                    navManuRoutes?.slice(0,5).map(nav => {
                        return (
                            <NavLink to={nav.link}><p className="leading-7 cursor-pointer">{nav.name}</p></NavLink>
                        )
                    })
                }
            </section>            
            <section className="w-[350px]  xsm:w-[50%] sm:w-[50%] lg:h-full xsm:h-auto sm:h-auto ">
                <p className="font-bold text-xl mb-3">Contact Info:</p>
                {
                    navManuRoutes?.slice(2,4).map((nav, index) => {
                        return (
                            <NavLink key={index+1} to={nav.link}><p className="leading-7 cursor-pointer">{nav.name}</p></NavLink>
                        )
                    })
                }
            </section>            
            <section className="lg:w-[350px] lg:h-full sm:w-full xsm:w-full xsm:h-auto sm:h-auto xsm:my-6">
                {
                    socialIcons.map((icon, index) => {
                        return (
                            <span  key={index+1} className="mr-8 text-2xl">{icon.icon}</span>
                        )
                    })
                }
                <br />
                <br />
                <div className="text-sm font-semibold">
                    <p>Email : roombridge223@gmail.com</p>
                    <p>Phone No: : +801-33452365</p>
                    <p>Office Address : Kolpolok, Road-2, Block-C/Line-3, BridgeCom-Tower, Kalamial Bazar, Chittagong, Bangladesh</p>
                </div>
            </section>            
            </div>
            <div className="text-center">
                <p className="text-sm font-semibold">&copy; All Rights reserved by RoomBridge</p>
                <p className="pb-3 text-sm font-semibold">{date.getFullYear()}</p>
            </div>
        </div>
    );
};

export default Footer;