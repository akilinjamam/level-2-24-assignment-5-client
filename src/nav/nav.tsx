import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import nav from './Navbar.module.css';
// import keyboard from '../../images/keyboard.png'


import { useState } from 'react';
import { navManuRoutes, TNav } from './navMenuRoute';
import { barger, user} from '../icons/icons';

const Navbar = () => {
    const navigate = useNavigate();
   
    const location = useLocation().pathname;
    const [view, setView] = useState(false)
    const [userView, setUserView] = useState(false);

    console.log(location.slice(0,10))

    const handleNavbar = () => {
        const findNav = navManuRoutes?.some(item => {
            return item.link === location
        })

        if(location.slice(0,13) === '/room-detail/') return 'block'
        if(location.slice(0,9) === '/booking/') return 'block'
        if(location.slice(0,10) === '/checkout/') return 'block'
        if(location === '/my-bookings') return 'block'
        if(location.slice(0,10) === '/dashboard') return 'block'

        if(findNav){
            return 'block'
        }else{
            return 'none'
        }
    }

    const logout = () => {
        localStorage.removeItem("roomBridgeToken");
        navigate('/login')
    }

    return (
        <div style={{display: `${handleNavbar()}`}} className={`${nav.main} w-[100%] h-12 my-6 rounded-2xl flex items-center`}>
            <nav className='w-[100%] h-[50%] m-auto flex items-center justify-between xsm:hidden sm:hidden md:hidden lg:flex'>
               
                <section className='w-[260px] flex items-center justify-start'>
                    <NavLink to='/'>
                        {/* <img width={100} src={keyboard} alt="" /> */}
                        
                    </NavLink>
                    <NavLink to='/'>
                        <span className='text-2xl font-bold text-purple-600'>RoomBridge</span> 
                    </NavLink>       
                </section>
                
                <section  className='w-auto flex'>
                   {
                    navManuRoutes.map((nav:TNav, index:number) => {
                        const active = (value: string) => {
                            return (value === location || value === location.slice(0,10))  ? 'text-purple-600' : 'text-gray-700' 
                        }
                        return (
                            <div key={index+1}>
                                {
                                    !nav.hide
                                    &&
                                    <NavLink className={`mx-[20px] font-bold ${active(`${nav.link}`)} hover:text-purple-600 `} to={nav.link}>{nav.name}</NavLink> 
                                }
                            </div>
                        )
                    } )
                   }
                  
                        <div style={{position:'relative'}}>
                            <p className='cursor-pointer' onClick={() => setUserView(!userView)}>{user}</p> 
                            <div >
                                <div className='bg-purple-200 font-bold text-sm w-[150px] h-[120px] flex items-center justify-center text-gray-700 rounded-lg p-2 z-10'  style={{position:'absolute', top:'30px',right:'0', display: `${userView ? 'block' : 'none'}` }}
                                >
                                    <p>USER</p>
                                    <hr className='my-2' />
                                    <NavLink to='/my-bookings'>
                                        <p><span ><i className="uil uil-user text-lg"></i></span> My Bookings</p>
                                    </NavLink>
                                    <p className='cursor-pointer' onClick={logout}><i className="uil uil-signout text-lg"></i> Logout</p>

                                </div>
                            </div>
                        </div>
                 
                </section>                   
            </nav>
            <nav className='w-[100%] h-[50%] m-auto flex items-center justify-between xsm:flex sm:flex md:flex lg:hidden'>
               
                <section className='w-[260px] flex items-center justify-between'>
                   
                    <NavLink to='/'>
                        <span className='text-2xl font-bold text-purple-600'>RoomBridge</span> 
                    </NavLink>       
                </section>
                
                <section className='w-auto flex  relative'>
                       <div className='flex'>
                            
                                <div className='mr-3' style={{position:'relative'}}>
                                    <p className='cursor-pointer' onClick={() =>{ 
                                        setUserView(!userView)
                                        setView(false)
                                    } }>{user}</p> 
                                    <div >
                                        <div className='bg-purple-200 font-bold text-sm w-[150px] h-[120px] flex items-center justify-center text-gray-700 rounded-lg p-2'  style={{position:'absolute', top:'30px',right:'0', display: `${userView ? 'block' : 'none'}` }}
                                        >
                                            <p>USER</p>
                                            <hr className='my-2' />
                                            <p><span ><i className="uil uil-user text-lg"></i></span> My Bookings</p>
                                            <p className='cursor-pointer' onClick={logout}><i className="uil uil-signout text-lg"></i> Logout</p>

                                        </div>
                                    </div> 
                                </div>
                           
                            <p onClick={() => {
                                setView(!view)
                                setUserView(false)
                            }} className='cursor-pointer'>{barger}</p>
                            
                       </div>
                        
                        <div  className={` ${view ? 'block': 'hidden'} w-[200px] h-auto p-3 bg-purple-100 rounded-lg z-10 absolute right-5 top-10`}>
                        {
                            navManuRoutes.map((nav:TNav, index:number) => {
                                    const active = (value: string) => {
                                return value === location?.slice(0,10) ? 'text-purple-600' : 'text-gray-700' 
                                }
                                return (
                                <div className='leading-8' key={index+1}>
                                    <NavLink onClick={() => setView(false)} className={`mx-[20px] font-bold ${active(`${nav.link}`)} hover:text-purple-600 `} to={nav.link}>{nav.name}</NavLink>
                                </div>
                            )
                            })
                        }
                        
                        </div> 
                </section>                    
            </nav>
            
        </div>
    );
};

export default Navbar;