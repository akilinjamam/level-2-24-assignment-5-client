import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import AdminBooking from "../page/admin/booking/AdminBooking";
import Dashboard from "../page/admin/Dashboard";
import AdminRoom from "../page/admin/romm/AdminRoom";
import CreateAdminRoom from "../page/admin/romm/CreateAdminRoom";
import UpdateAdminRoom from "../page/admin/romm/UpdateAdminRoom";
import AdminSlot from "../page/admin/slots/AdminSlot";
import CreateAdminSlot from "../page/admin/slots/CreateAdminSlot";
import UpdateAdminSlot from "../page/admin/slots/UpdateAdminSlot";
import UserManagement from "../page/admin/userManagement/UserManagement";
import Bookings from "../page/booking/Booking";
import Checkout from "../page/chckout/Checkout";
import Login from "../page/Login/Login";
import MyBookings from "../page/my-bookings/MyBooking";
import Registration from "../page/Registration/Registration";
import RoomDetails from "../page/roomDetails/RoomDetails";

export const authenticationRoute = [
    {
        path: '/registration',
        element: <Layout><Registration/></Layout>
    },
    {
        path: '/login',
        element: <Layout><Login/></Layout>
    },
    {
        path: '/booking/:bookingId',
        element: <Layout><Bookings/></Layout>
    },
    {
        path: '/room-detail/:roomId',
        element: <Layout><RoomDetails/></Layout>
    },
    {
        path: '/checkout/:checkoutId',
        element: <Layout><Checkout/></Layout>
    },
    {
        path: '/my-bookings',
        element: <Layout><MyBookings/></Layout>
    },
    {
        path: '/dashboard',
        element: <AdminLayout><Dashboard/></AdminLayout>,
        children: [
            { index: true, element: <CreateAdminRoom/> },
            {
                path: 'admin-add-room',
                element: <AdminRoom/>
            },
            {
                path: 'admin-update-room/:updateRoomId',
                element: <UpdateAdminRoom/>
            },
            {
                path: 'admin-slot',
                element: <AdminSlot/>
            },
            {
                path: 'create-admin-slot',
                element: <CreateAdminSlot/>
            },
            {
                path: 'update-admin-slot/:updateSlotId',
                element: <UpdateAdminSlot/>
            },
            {
                path: 'admin-booking',
                element: <AdminBooking/>
            },
            {
                path: 'user-management',
                element: <UserManagement/>
            },
        ]
    },
]

