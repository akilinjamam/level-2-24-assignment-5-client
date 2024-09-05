import { NavLink, Outlet, useLocation } from "react-router-dom";
import { allMenuItems, TMenuItems } from "./allMenuItems";



const Dashboard = () => {
    const location = useLocation().pathname;
    return (
        <div className="w-full h-[100%] flex items-center justify-between">
            <section className="w-[17%] h-[100%] bg-purple-50 p-2">
                <p className="text-center font-bold pb-2 text-purple-600">MENU LIST</p>
                <hr />
                <div>
                    {
                        allMenuItems.map((item:TMenuItems) => {
                            const active = (link:TMenuItems) => {
                            
                                const allLinks = [link.link, link.linkTwo];
                                const allIdLinks = [link.linkThree];
                                const modifiedLocation = location.slice(0, location.length - 25)

                                if(link.linkThree === modifiedLocation){
                                    const activeId = allIdLinks.some((item:string) => item === modifiedLocation);
                                    return activeId ? 'text-purple-600 font-bold' : 'text-gray-700'
                                }
                                const active = allLinks.some((item:string) => item === location)
                                return active ? 'text-purple-600 font-bold' : 'text-gray-700'
                            }

                            return (
                                <NavLink to={item.link}>
                                    <p className={`py-1.5 ${active(item)}`}>{item.icon} <span className="xsm:hidden sm:hidden md:inline lg:inline">{item.title}</span></p>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </section>
            <section className="w-[82%] h-[100%] bg-purple-50 p-2 overflow-x-hidden overflow-y-scroll ">
                <p className="text-center font-bold pb-2 text-purple-600">DASHBOARD</p>
                <hr className="mb-2"/>
                <Outlet/>
            </section>
            
        </div>
    );
};

export default Dashboard;