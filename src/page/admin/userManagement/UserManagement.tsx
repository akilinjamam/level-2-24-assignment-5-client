/* eslint-disable @typescript-eslint/no-explicit-any */
import viewUser from './UserManagement.module.css';
import loadingAnim from '../../../animation/loading.json';
import { useLottie } from "lottie-react";
import { useGetAllUserQuery, useUpdateUserMutation } from "../../../redux/auth/authApi";
import { toast } from "react-toastify";

const UserManagement = () => {

    const options = {
        animationData: loadingAnim,
        loop: true
    }

    const {View} = useLottie(options)

    const {data:allUsers, isLoading} = useGetAllUserQuery('');
    console.log(allUsers) 


    const [updateUser] = useUpdateUserMutation();

    const handleUser = async (role:string, id:string) => {
        const updatedData = role === 'admin' ? 'user' : 'admin';
        const newData = {
            role: updatedData
        };
        const newBodyData = {
            data: newData,
            id
        }
        try {
            const res = await updateUser(newBodyData).unwrap();
            if(res.success){
                toast.success(res.message)
            }

        } catch (error) {
            console.log(error);
            toast.error('something is wrong')
        }

    }


    return (
        <div className={`w-full ${viewUser}`}>
            <div className="w-full h-[60px] flex items-center justify-between">
                <span className="font-bold">Total Users : {allUsers?.data?.length ? allUsers?.data?.length : 'loading...'}</span>
            
            </div>
            <hr />
            { !isLoading
                ?
                <div className={`${viewUser.tableContainer}`}>
                    <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    { 
                        allUsers?.data?.map((user:any) => (
                            <tr>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td className="flex items-center justify-around">
                                <button onClick={() => handleUser(user?.role, user?._id)} className={`text-sm w-[100px] py-1  text-white rounded md ml-2 ${user?.role === 'admin' ? 'bg-orange-600' : 'bg-green-600'}`}>{user?.role === 'admin' ? 'Make User' : 'Make Admin'}</button>
                                    
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

export default UserManagement;