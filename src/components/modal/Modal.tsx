import { toast } from "react-toastify";
import { deleted } from "../../icons/icons";
import { controllModal } from "../../redux/features/modal.slice";
import { useDeleteRoomMutation } from "../../redux/features/room.api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useDeleteSlotMutation } from "../../redux/features/slot.api";
import { useDeleteBookingMutation } from "../../redux/features/booking.api";

const Modal = () => {
    const {open, id, name, type} = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch();

    const [deleteRoom,{isLoading:isLoadingRoom}] = useDeleteRoomMutation();
    const [deleteSlot,{isLoading: isLoadingSlot}] = useDeleteSlotMutation();
    const [deleteBooking,{isLoading: isLoadingBooking}] = useDeleteBookingMutation();


    const deleteItem = async () => {
          
        if(type === 'room'){
            
            try {
                const res = await deleteRoom(id).unwrap();
                if(res?.success){
                    toast.success(res?.message)
                    dispatch(controllModal({open:false}))
                }
              console.log(res)
            } catch (error) {
                console.log(error)
                toast.error('somthing is wrong')
            }
        }
        if(type === 'slot'){

            try {
                const res = await deleteSlot(id).unwrap();
                if(res?.success){
                    toast.success(res?.message)
                    dispatch(controllModal({open:false}))
                }
              console.log(res)
            } catch (error) {
                console.log(error)
                toast.error('something is wrong')
            }
        }
        if(type === 'booking'){

            try {
                const res = await deleteBooking(id).unwrap();
                if(res?.success){
                    toast.success(res?.message)
                    dispatch(controllModal({open:false}))
                }
              console.log(res)
            } catch (error) {
                console.log(error)
                toast.error('something is wrong')
            }
        }
    }


    return (
        
            <div className={`${open ? 'block' : 'hidden'} w-[82%] h-full  flex items-center justify-center  absolute right-0`}>
                <div className=" bg-purple-100 lg:w-[50%] sm:w-[95%] md:w-[50%] xsm:w-95% h-[350px]  ">
                    <div className="w-full h-[40px] bg-purple-200 flex items-center justify-end px-2">
                        <p onClick={() => dispatch(controllModal({open: false}))} className="cursor-pointer">{deleted}</p>
                    </div>
                    <div className="w-full h-[310px] flex items-center justify-center">
                        <div className="w-[80%] h-[150px] bg-purple-200 relative">
                            <div className="w-full h-[100px] flex items-center justify-center">
                                    <p className="font-bold">Are you sure to delete this: {name}</p>
                            </div>
                            
                            <div className="w-full h-[70px] absolute bottom-0 flex items-center justify-center">
                                <button onClick={deleteItem} className="bg-red-600 py-1 px-4 rounded-md text-white font-bold">{(isLoadingRoom || isLoadingSlot || isLoadingBooking) ? 'deleting..': 'OK'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Modal;