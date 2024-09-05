/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import viewRooms from './AdminRoom.module.css';
import { useGetAllRoomsQuery } from "../../../redux/features/room.api";
import loadingAnim from '../../../animation/loading.json';
import { useLottie } from "lottie-react";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { controllModal } from "../../../redux/features/modal.slice";

const CreateAdminRoom = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate()
    const options = {
        animationData: loadingAnim,
        loop: true
    }

    const {View} = useLottie(options)

    const {data:allRooms, isLoading} = useGetAllRoomsQuery('');
    console.log(allRooms) 
    return (
        <div className={`w-full ${viewRooms}`}>
            <div className="w-full h-[60px] flex items-center justify-between">
                <span className="font-bold">Total Rooms : {allRooms?.data?.length ? allRooms?.data?.length : 'loading...'}</span>
                <span><NavLink to='/dashboard/admin-add-room'><Button data={<i className="uil uil-plus"></i>}> CREATE ROOM</Button></NavLink></span>
            </div>
            <hr />
            { !isLoading
                ?
                <div className={`${viewRooms.tableContainer}`}>
                    <table>
                    <tr>
                        <th>Room Name</th>
                        <th>Room No</th>
                        <th>Floor No</th>
                        <th>Capacity</th>
                        <th>Price/slot</th>
                        <th>Action</th>
                    </tr>
                    { 
                        allRooms?.data?.map((room:any) => (
                            <tr>
                                <td>{room?.name}</td>
                                <td>{room?.roomNo}</td>
                                <td>{room?.floorNo}</td>
                                <td>{room?.capacity}</td>
                                <td>{room?.pricePerSlot}</td>
                                <td className="flex items-center justify-around">
                                    <button onClick={() => navigate(`/dashboard/admin-update-room/${room?._id}`)} className="text-sm px-2 py-1 bg-green-600 text-white rounded md ml-2">UPDATE</button>


                                    
                                    <button onClick={() => dispatch(controllModal({open:true, id:room?._id, name: room?.name, type: "room"}))} className="text-sm px-2 py-1 bg-red-600 text-white rounded md ml-2">DELETE</button>
                                </td>
                            </tr>
                        ))  
                    }
               
                    </table>
                </div>
                :
                <div className="w-full h-[300px] flex items-center justify-center">
                        <div className="w-[200px]">{View}</div>
                    </div>
            }
    
        </div>
    );
};

export default CreateAdminRoom;