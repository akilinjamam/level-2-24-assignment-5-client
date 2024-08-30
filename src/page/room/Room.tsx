// import room from './Room.module.css';
import { NavLink } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../redux/features/room.api";
import { TProductItem } from "../home/featured/productItems";
import room from './Room.module.css';
import Button from "../../components/button/Button";
import notFound from '../../images/not-found.png';
import { useState } from "react";
import { deleted } from "../../icons/icons";
const Room = () => {
    const [search, setSearch] = useState('')
    const [capacity, setCapacity] = useState('')
    const [price, setPrice] = useState('')
    const [sort, setSort] = useState('')

    const allSearchableValue = [
        {
            name: 'searchTerm',
            value: search
        },
        {
            name: 'capacity',
            value: capacity
        },
        {
            name: 'pricePerSlot',
            value: price
        },
        {
            name: 'sort',
            value: sort
        },
    ]

    const {data} = useGetAllRoomsQuery(allSearchableValue)
    console.log(data)
    return (
        <div className={`${room.main}`}>
        <div className={`${room.partOne} lg:w-full xsm:w-full sm:w-full md:full  lg:h-[50px] xsm:h-auto sm:h-auto  bg-purple-50 rounded-lg flex items-center justify-between p-2`}>
        <p  onClick={() => {
                setPrice('')
                setCapacity('')
                setSearch('')
                setSort('')
               }} className="mb-3 cursor-pointer xsm:block sm:block lg:hidden md:hidden">{deleted}</p>
            <div className="sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0">
                <p>Total Products: {data?.data?.length > 0 ? data?.data?.length : 'Loading...'}</p>
            </div>
            <div className="sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0">
                <label htmlFor="search">Search:</label>
                <input value={search} className="ml-2" type="text" onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className={`${room.partOne} flex sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0`}>
               <div className="sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0">
                    <label htmlFor="search">Capacity:</label>
                    <input value={capacity} className="ml-2" type="number" onChange={(e) => setCapacity(e.target.value )}/>
               </div>
               <div className="lg:ml-2 xsm:ml-0 sm:ml-0 sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0">
                    <label htmlFor="search">Price Per Slot:</label>
                    <input value={price} className="ml-2" type="number" onChange={(e) => setPrice(e.target.value)}/>
               </div>
            </div>
            <div className={`${room.partOne} flex sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0`}>
               <div className="lg:w-auto sm:w-full xsm:w-full">
                    <label htmlFor="search">sort:</label>
                    <select value={sort} className="ml-2"  onChange={(e) => setSort(e.target.value)}>
                        <option value="">select sort</option>
                        <option value="pricePerSlot">asc</option>
                        <option value="-pricePerSlot">dsc</option>
                    </select>
               </div>

               <p  onClick={() => {
                setSearch('')
                setPrice('')
                setCapacity('')
                setSort('')
               }} className="ml-5 cursor-pointer xsm:hidden sm:hidden lg:block md:block">{deleted}</p>
               
            </div>
        </div>
        { search
            ?
            <div>
                {
                data?.data?.length > 0
                ?
                data?.data?.map((item:TProductItem, index:number) => {
                    return (
                        <div key={index+1} className={`${room.partOne} w-full lg:h-[330px] xsm:h-auto sm:h-auto bg-purple-50 rounded-lg my-6 p-3 flex items-center justify-between`}>
                            <section className="lg:w-[30%] sm:w-full xsm:w-full lg:h-full sm:h-auto xsm:h-auto  rounded-lg">
                                <img className="xsm:block sm:block xsm:mx-auto sm:mx-auto" style={{width:'400px', height:'300px', borderRadius:'10px'}} src={item?.img} alt="" />
                            </section>
                            <section className="lg:w-[69%] xsm:w-full sm:w-full lg:h-full sm:h-auto xsm:h-auto  rounded-lg leading-8 p-3 text-gray-700">
                                <p>Room Name: {item.name}</p>
                                <p>Capacity: {item.capacity}</p>
                                <p>Price Per Slot: {item.pricePerSlot}</p>
                               
                                <NavLink to={`/productDetail/${index+1}`}><Button>Details</Button></NavLink>
                                
                            </section>
                        </div>
                    )
                })
                :
                <div className="w-full h-[330px] bg-purple-50 my-6 rounded-lg flex items-center justify-center">
                    <img width={400} src={notFound} alt="" />
                </div>
            }
            </div>
            :
           data?.data?.length > 0 
           ?
           data?.data?.map((item:TProductItem, index:number) => {
                return (
                    <div key={index+1} className={`${room.partOne} lg:w-full xsm:w-full sm:w-full lg:h-[330px] xsm:h-auto sm:h-auto bg-purple-50 rounded-lg my-6 p-3 flex items-center justify-between`}>
                        <section className="lg:w-[30%] xsm:w-full sm:w-full  h-full  rounded-lg ">
                            <img className="xsm:block sm:block xsm:mx-auto sm:mx-auto" style={{width:'400px', height:'300px', borderRadius:'10px',}} src={item?.img} alt="" />
                        </section>
                        <section className="w-[69%] h-full  rounded-lg leading-8 p-3 text-gray-700">
                            <p>Room Name: {item.name}</p>
                            <p>Capacity: {item.capacity}</p>
                            <p>Price Per Slot: {item.pricePerSlot}</p>
                            
                            <NavLink to={`/productDetail/${index+1}`}><Button>Details</Button></NavLink>
                            
                        </section>
                    </div>
                )
            })
            :
            <div className="w-full h-[330px] bg-purple-50 my-6 rounded-lg flex items-center justify-center">
                <img width={400} src={notFound} alt="" />
            </div>

        }
    </div>
    );
};

export default Room;