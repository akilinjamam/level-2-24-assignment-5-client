import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import AdminBooking from "../page/admin/booking/AdminBooking";
import Dashboard from "../page/admin/Dashboard";
import AdminRoom from "../page/admin/romm/AdminRoom";
import AdminSlot from "../page/admin/slots/AdminSlot";
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
            { index: true, element: <AdminRoom/> },
            {
                path: 'admin-slot',
                element: <AdminSlot/>
            },
            {
                path: 'admin-booking',
                element: <AdminBooking/>
            },
        ]
    },
]

