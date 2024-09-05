import { SubmitHandler, useForm } from "react-hook-form";
import { inputItems, TInputItems } from "./inputItems";
import { useAddRoomMutation } from "../../../redux/features/room.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { deleted } from "../../../icons/icons";
import { useNavigate } from "react-router-dom";
import { updloadCloudinaryImage } from "../../../cloudinaryImg/cloudinaryImg";


export  type TInputs = {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string;
}

const AdminRoom = () => {
    const navigate = useNavigate();
    const [imgHolder, setImgHolder] = useState<string[]>([])
    console.log(imgHolder)
    const {
        register,
        handleSubmit,
      } = useForm<TInputs>()

      

      const [addRoom, {error}] = useAddRoomMutation();
      console.log(error)

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        
        const modifiedAmenities = data.amenities.replace(/\s+/g, '').split(',')

        const allRoomData = {
            ...data,
            amenities: modifiedAmenities,
            roomNo: Number(data.roomNo), 
            floorNo: Number(data.floorNo), 
            capacity: Number(data.capacity), 
            pricePerSlot: Number(data.pricePerSlot),
            images: imgHolder
        }

        console.log(allRoomData);

        try {
            const response = await addRoom(allRoomData).unwrap();
            console.log(response)
            if(response.success){
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something is wrong')
        }


    }

    const deleteImg = (deletableValue: string) => {
        const findImg = imgHolder.find((f:string) => f === deletableValue);
        console.log('deletable img:',findImg);

        const deletedImg = imgHolder.filter((f:string) => f !== deletableValue);
        setImgHolder(deletedImg)
    }

    return (
        <div>
            <p className="text-gray-800 font-bold mb-10">CREATE ROOM :</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        inputItems.map((input: TInputItems) => (
                            <div>
                                <input style={{background:'none',borderBottom:'1px solid lightgray'}}className='mb-3 w-[400px]  ' placeholder={input.placeHolder} {...register(input.reg)} required/>
                                <br />
                                
                            </div>
                        ))
                    }
                    <br />
                    <div className="flex flex-wrap">
                        {
                            imgHolder?.map((item:string) => (
                                <div className="relative w-auto mx-1">
                                    <img className="h-[70px]" width={100} height={100} src={item} alt="" />
                                    <p onClick={() => deleteImg(item)} className="absolute top-[5px] right-[5px] text-gray-50 cursor-pointer">{deleted}</p>
                                </div>
                            ) )
                        }
                    </div>
                    <br />
                    <input type="file" name="" id="" required 
                    onChange={(e) => {
                        const files = e.target.files;
                        if(files && files.length > 0 ){
                            const file = files[0];
                            updloadCloudinaryImage(file, setImgHolder, toast)
                        }
                    }}
                    />
                    <br />
                    <br />
                    <div className="flex">
                        <input className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
                        <p onClick={() => navigate('/dashboard')} className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer flex items-center justify-center ml-2'>BACK</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminRoom;