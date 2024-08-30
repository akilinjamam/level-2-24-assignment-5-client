import { useGetAllRoomsQuery } from "../../redux/features/room.api";

const Room = () => {
    const {data} = useGetAllRoomsQuery('')
    console.log(data)
    return (
        <div>
            this is room
        </div>
    );
};

export default Room;