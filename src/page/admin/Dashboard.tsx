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
                            const active = (link:string) => {
                                return link === location ? 'text-purple-600 font-bold' : 'text-gray-800'
                            }

                            return (
                                <NavLink to={item.link}>
                                    <p className={`py-1.5 ${active(item.link)}`}>{item.icon} {item.title}</p>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </section>
            <section className="w-[82%] h-[100%] bg-purple-50 p-2">
                <p className="text-center font-bold pb-2 text-purple-600">DASHBOARD</p>
                <hr />
                <Outlet/>
            </section>
        </div>
    );
};

export default Dashboard;