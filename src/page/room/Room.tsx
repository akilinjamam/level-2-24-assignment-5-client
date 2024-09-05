// import room from './Room.module.css';
import { NavLink } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../redux/features/room.api";
import { TProductItem } from "../home/featured/productItems";
import room from './Room.module.css';
import Button from "../../components/button/Button";
import notFound from '../../images/not-found.png';
import { useState } from "react";
import { deleted } from "../../icons/icons";
import Pagination from "../../components/pagination/Pagination";
import loadingAnim from '../../animation/loading.json';
import { useLottie } from "lottie-react";
const Room = () => {

    const options = {
        animationData : loadingAnim,
        loop: true
    }

    const {View} = useLottie(options)

    const [search, setSearch] = useState('')
    const [capacity, setCapacity] = useState('')
    const [price, setPrice] = useState('')
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const limit = 10

    

   console.log('capacity:',capacity.length)

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
        {
            name: 'page',
            value: page
        },
        {
            name: 'limit',
            value: limit
        },
    ]

    const {data, isLoading} = useGetAllRoomsQuery(allSearchableValue)
    console.log(data);

    const hidePagination = () => {
        if(!data?.data){
            return 'hidden'
        }

        if(price.length === 0 && capacity.length === 0 && search.length === 0){
            return 'block'
        }else if(price.length === 0 && capacity.length !== 0){
            return 'hidden'
        }else if(price.length !== 0 && capacity.length === 0){
            return 'hidden'
        }else if(price.length !== 0 && capacity.length !== 0){
            return 'hidden'
        }else if(search.length == 0){
            return 'hidden'
        }else if (search.length !== 0){
            return 'hidden'
        }
        
    }


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
                <p>Total Rooms: {data?.data?.length > 0 ? data?.data?.length : 'Loading...'}</p>
            </div>
            <div className="sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0">
                <label htmlFor="search">Search:</label>
                <input value={search} className="ml-2" type="text" onChange={(e) => {
                    setPage(1)
                    setSearch(e.target.value)
                }}/>
            </div>
            <div className={`${room.partOne} flex sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0`}>
               <div className="sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0">
                    <label htmlFor="search">Capacity:</label>
                    <input value={capacity} className="ml-2" type="number" onChange={(e) => {
                        setPage(1)
                        setCapacity(e.target.value )
                    }}/>
               </div>
               <div className="lg:ml-2 xsm:ml-0 sm:ml-0 sm:w-full lg:w-auto xsm:w-full xsm:mb-2 sm:mb-2 lg:mb-0">
                    <label htmlFor="search">Price Per Slot:</label>
                    <input value={price} className="ml-2" type="number" onChange={(e) => {
                        setPage(1)
                        setPrice(e.target.value)
                    }}/>
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
                               
                                <NavLink to={`/room-detail/${index+1}`}><Button>Details</Button></NavLink>
                                
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
           !isLoading 
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
                            
                            <NavLink to={`/room-detail/${item._id}`}><Button>Details</Button></NavLink>
                            
                        </section>
                    </div>
                )
            })
            :
            <div className="w-full h-[330px] bg-purple-50 my-6 rounded-lg flex items-center justify-center">
                <div className="w-[300px]">{View}</div>
            </div>

        }

        <div className={`w-full h-[50px] bg-purple-50 my-6 rounded-md flex items-center justify-center ${hidePagination()}`}>
            <Pagination allData={data?.meta} setPage={setPage}/>
        </div>
        
    </div>
    );
};

export default Room;