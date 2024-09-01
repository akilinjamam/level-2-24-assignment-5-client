import Layout from "../layout/Layout";
import About from "../page/aboutus/About";
import Contact from "../page/contactus/ContactUs";
import Error from "../page/error/Error";
import Room from "../page/room/Room";
import Success from "../page/success/Success";

export const otherRoutes = [
    {
        path: '/about',
        element: <Layout><About/></Layout>
    },
    {
        path: '/contact',
        element: <Layout><Contact/></Layout>
    },
    {
        path: '/room',
        element: <Layout><Room/></Layout>
    },
    {
        path: '/success',
        element: <Layout><Success/></Layout>
    },
    {
        path: '*',
        element: <Layout><Error/></Layout>
    },
]