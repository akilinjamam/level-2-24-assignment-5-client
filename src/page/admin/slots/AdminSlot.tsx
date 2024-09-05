/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import viewSlot from './AdminSlot.module.css';
import loadingAnim from '../../../animation/loading.json';
import { useLottie } from "lottie-react";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { controllModal } from "../../../redux/features/modal.slice";
import { useGetAllSlotsQuery } from "../../../redux/features/slot.api";
import { useGetAllRoomsQuery } from "../../../redux/features/room.api";
import { useState } from "react";
import { deleted } from "../../../icons/icons";

const AdminSlot = () => {

    type TQueryData = {
        date: string;
        roomId: string;
    }

    const [queryData, setQueryData] = useState<TQueryData>({
        date: '',
        roomId: ''
    })

    const dispatch = useAppDispatch();

    const navigate = useNavigate()
    const options = {
        animationData: loadingAnim,
        loop: true
    }

    const {View} = useLottie(options)

    const {data: allRooms} = useGetAllRoomsQuery('');

    const allQueryArray = [
        {
            name: 'date',
            value: queryData.date
        },
        {
            name: 'roomId',
            value: queryData.roomId
        },
    ]


    const {data:allSlots, isLoading} = useGetAllSlotsQuery(allQueryArray);
    
    
    const allSlotDates = allSlots?.data?.map((item:any) => item?.date);
    
    const uniqueDateList = [...new Set(allSlotDates)];
    
    console.log(uniqueDateList) 


    return (
        <div className={`w-full ${viewSlot}`}>
            <div className="w-full h-[60px] flex items-center justify-between">
                <span className="font-bold">Total Slots : {allSlots?.data?.length ? allSlots?.data?.length : 'loading...'}</span>
                <div className="flex">
                    <select value={queryData.date} name="" id=""
                    onChange={(e) => setQueryData({...queryData, date: e.target.value})}
                    >
                        <option value="">select date</option>
                        {
                            uniqueDateList?.map((item:any) => <option value={item}>{item}</option> )
                        }
                        
                    </select>
                    <div onClick={() => {
                        setQueryData({...queryData, date: ''})
                    }} className="ml-2">{deleted}</div>
                </div>
                <div className="flex">
                    <select value={queryData.roomId} name="" id=""
                    onChange={(e) => setQueryData({...queryData, roomId: e.target.value})}
                    >
                        <option value="">select room</option>
                        {
                            allRooms?.data?.map((item:any) => <option value={item?._id}>{item?.name}</option> )
                        }
                        
                    </select>
                    <div className="ml-2" onClick={() => {
                        setQueryData({...queryData, roomId: ''})
                    }}>
                        {deleted}
                    </div>
                </div>
                <span><NavLink to='/dashboard/create-admin-slot'><Button data={<i className="uil uil-plus"></i>}> CREATE SLOTS</Button></NavLink></span>
            </div>
            <hr />
            { !isLoading
                ?
                <table>
                    <tr>
                        <th>Room Name</th>
                        <th>Room No</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                    { 
                        allSlots?.data?.map((slot:any) => (
                            <tr>
                                <td>{slot?.room?.name}</td>
                                <td>{slot?.room?.roomNo}</td>
                                <td>{slot?.date}</td>
                                <td>{slot?.startTime}</td>
                                <td>{slot?.endTime}</td>
                                <td className="flex items-center justify-around">
                                    <button onClick={() => navigate(`/dashboard/update-admin-slot/${slot?._id}`)} className="text-sm px-2 py-1 bg-green-600 text-white rounded md ml-2">UPDATE</button>
                                    <button onClick={() => dispatch(controllModal({open:true, id:slot?._id, name: slot?.room?.name, type: "slot"}))} className="text-sm px-2 py-1 bg-red-600 text-white rounded md ml-2">DELETE</button>
                                </td>
                            </tr>
                        ))  
                    }
               
                </table>
                :
                <div className="w-full h-[300px] flex items-center justify-center">
                        <div className="w-[200px]">{View}</div>
                    </div>
            }
    
        </div>
    );
};

export default AdminSlot;