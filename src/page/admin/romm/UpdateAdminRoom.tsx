/* eslint-disable @typescript-eslint/no-explicit-any */
import { inputItems, TInputItems } from "./inputItems";
import { useGetAllRoomsQuery, useUpdateRoomMutation } from "../../../redux/features/room.api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { deleted } from "../../../icons/icons";
import { useNavigate, useParams } from "react-router-dom";
import { updloadCloudinaryReplaceImage } from "../../../cloudinaryImg/cloudinaryReplaceImg";

export  type TInputs = {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string;
}

const UpdateAdminRoom = () => {
    const [copyAllData, setCopyAllData] = useState<any>({});
    const {updateRoomId} = useParams();
    console.log(updateRoomId)
    const navigate = useNavigate();
    const [imgHolder, setImgHolder] = useState<string[]>([])
    const [replacingImg, setReplacingImg] = useState<string>('')
    const [showImg, setShowImg] = useState<string[]>([])
    const [border, setBorder] = useState<string>('')
    
    const {data: allRooms, isLoading} = useGetAllRoomsQuery('');


      const findRoom = allRooms?.data?.find((f:any) => f?._id === updateRoomId)
      console.log(copyAllData)
      

      useEffect(() =>  {
            setCopyAllData({
                name: findRoom?.name,
                roomNo: findRoom?.roomNo,
                floorNo: findRoom?.floorNo,
                capacity: findRoom?.capacity,
                pricePerSlot: findRoom?. pricePerSlot,
                amenities: findRoom?.amenities
            })
            const prevImg  = findRoom?.images
            
            setImgHolder(prevImg)
      }, [findRoom, imgHolder])


     
      useEffect(() => {
        setShowImg(imgHolder)
      }, [imgHolder])

    const [updateRoomInfo] = useUpdateRoomMutation();

    console.log(typeof copyAllData?.amenities)
    const onSubmit  = async () => {
        let newAmenities = [];
        if(typeof copyAllData?.amenities === 'object'){
            newAmenities = copyAllData?.amenities;
        }else if (typeof copyAllData?.amenities === 'string'){
            newAmenities = copyAllData?.amenities?.replace(/\s+/g, '').split(',')
        }
        
        console.log(newAmenities)

        const updateRoomData = {
            name: copyAllData?.name,
            amenities: newAmenities,
            roomNo: Number(copyAllData?.roomNo), 
            floorNo: Number(copyAllData?.floorNo), 
            capacity: Number(copyAllData?.capacity), 
            pricePerSlot: Number(copyAllData?.pricePerSlot),
            images: showImg,
            _id: updateRoomId
        };
        

        console.log(updateRoomData);

        try {
            const response = await updateRoomInfo(updateRoomData).unwrap();
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

        const deletedImg = showImg.filter((f:string) => f !== deletableValue);
        setShowImg(deletedImg)
    }

    const replaceImage = () => { 
        setShowImg((prev:string[]) => prev.map((item:any) => item === border ? replacingImg : item) )
        setBorder('')
    }

    console.log('replacing img:',typeof replacingImg)

    return (
        <div>
            <p className="text-gray-800 font-bold mb-10">UPDATE ROOM :</p>
            <div>
                <form>
                    {
                        inputItems.map((input: TInputItems) => (
                            <div>
                                <input 
                                type={input.type}
                                value={findRoom ? copyAllData[input.reg] : 'loading...'} 
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
                      
                    <div className="flex flex-wrap  mx-1">
                        {   !isLoading
                            ?
                            showImg?.map((item:any) => (
                                <div className="relative">
                                    <img onClick={() => {
                                        setBorder(item)
                                    }}
                                    onDoubleClick={() => setBorder('')}
                                    style={{border:`${border === item ? '3px solid orange' : 'none'}`}} className={`h-[70px] mx-1`} width={100} height={100} src={item} alt="" />
                                    <p onClick={() => deleteImg(item)} className="absolute top-1 right-2 text-white cursor-pointer">{deleted}</p>
                                </div>
                            ))
                            :
                            <p>Loading...</p>
                        }
                        
                    </div> 
                    <br />
                    <div>
                        {
                            border
                            &&
                            <input type="file" name="" id="" required 
                        onChange={(e) => {
                            const files = e.target.files;
                            if(files && files.length > 0 ){
                                const file = files[0];
                                if(border){
                                    updloadCloudinaryReplaceImage(file, setReplacingImg, toast)
                                }
                            }
                        }}
                        />
                        }
                     {
                        (border && replacingImg)
                        ?
                        <button onClick={replaceImage} className="p-2 bg-purple-600 text-white font-bold rounded-md ">UPDATE IMAGE</button>
                        :
                        ''
                    }
                    </div>
                    <br />
                    <br />
                    <div className="flex">
                        <input onClick={onSubmit} className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
                        <p onClick={() => navigate('/dashboard')} className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer flex items-center justify-center ml-2'>BACK</p>
                    </div>
                
            </div>
        </div>
    );
};

export default UpdateAdminRoom;