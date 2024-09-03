import Layout from "../layout/Layout";
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
]