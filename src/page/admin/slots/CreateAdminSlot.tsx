/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { inputSlotItems, TSlotInputItems } from "./inputSlotItems";
import { useGetAllRoomsQuery } from "../../../redux/features/room.api";
import { useState } from "react";
import { useAddSlotMutation } from "../../../redux/features/slot.api";
import { toast } from "react-toastify";


 type TCreateSlotInputs = {
    room: string;
    date: string;
    startTime: string;
    endTime: string;
}

const CreateAdminSlot = () => {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
      } = useForm<TCreateSlotInputs>()

    const {data:getRooms} = useGetAllRoomsQuery('');

      const [addSlot, {error}] = useAddSlotMutation();
      console.log(error)

    const onSubmit: SubmitHandler<TCreateSlotInputs> = async (data) => {

        const slotData = {
            ...data,
            room:roomId
        }

        if(roomId){
            try {
            const response = await addSlot(slotData).unwrap();
            console.log(response)
            if(response.success){
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('please select room')
        }

        }

        console.log(roomId)
        console.log(data);
    }

    return (
        <div>
            <p className="text-gray-800 font-bold mb-10">CREATE SLOT :</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select name="" id="" onChange={(e) => setRoomId(e.target.value)}>
                        <option value="">select room</option>
                        {
                            getRooms?.data?.map((item:any) => <option value={item?._id}>{item?.name}</option>)
                        }
                    </select>
                    <br /><br />
                    {
                        inputSlotItems.map((input: TSlotInputItems) => (
                            <div>
                                <input type={input.type} style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px]  ' placeholder={input.placeHolder} {...register(input.reg)} required/>
                                <br />
                                
                            </div>
                        ))
                    }
                         
                    <br />
                    <div className="flex">
                        <input className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
                        <p onClick={() => navigate('/dashboard/admin-slot')} className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer flex items-center justify-center ml-2'>BACK</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAdminSlot;