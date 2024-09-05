/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { inputSlotItems, TSlotInputItems } from "./inputSlotItems";
import { useGetAllSlotsQuery, useUpdateSlotMutation } from "../../../redux/features/slot.api";

export  type TSlotInputs = {

    date: string;
    startTime: string;
    endTime: string;
}

const UpdateAdminSlot = () => {
    const [copyAllData, setCopyAllData] = useState<any>({});
    const {updateSlotId} = useParams();
    console.log(updateSlotId)
    const navigate = useNavigate();
    const [imgHolder, setImgHolder] = useState<string[]>([])
    
    const {data: allSlots,} = useGetAllSlotsQuery('');


      const findSlot = allSlots?.data?.find((f:any) => f?._id === updateSlotId)
      console.log(copyAllData)
      

      useEffect(() =>  {
            setCopyAllData({
                date: findSlot?.date,
                startTime: findSlot?.startTime,
                endTime: findSlot?.endTime,
            })
            const prevImg  = findSlot?.images
            
            setImgHolder(prevImg)
      }, [findSlot, imgHolder])



    const [updateSlotInfo] = useUpdateSlotMutation();

    const onSubmit  = async () => {
        
        const updatableData = {
            room: findSlot?.room?._id,
            oldDate: findSlot?.date,
            newDate: copyAllData?.date
        }

        console.log(updatableData);

        try {
            const response = await updateSlotInfo(updatableData).unwrap();
            console.log(response)
            if(response.success){
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something is wrong')
        }

    }

    return (
        <div>
            <p className="text-gray-800 font-bold mb-10">UPDATE SLOT :</p>
            <div>
                <form>
                    {
                        inputSlotItems.map((input: TSlotInputItems) => (
                            <div>
                                <input 
                                type={input.type}
                                value={findSlot ? copyAllData[input.reg] : 'loading...'} 
                                style={{ background: 'none', borderBottom: '1px solid lightgray' }} 
                                className='mb-3 w-[400px]' 
                                placeholder={input.placeHolder} 
                                required
                                onChange={(e) => setCopyAllData({ ...copyAllData, [input.reg]: e.target.value })}
                                />
                                <br />
                                
                            </div>
                        ))
                    }

                </form>
                    <br />
                    <div className="flex">
                        <input onClick={onSubmit} className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
                        <p onClick={() => navigate('/dashboard/admin-slot')} className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer flex items-center justify-center ml-2'>BACK</p>
                    </div>
                
            </div>
        </div>
    );
};

export default UpdateAdminSlot;