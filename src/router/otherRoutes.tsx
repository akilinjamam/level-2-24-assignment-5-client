import Layout from "../layout/Layout";
import About from "../page/aboutus/About";
import Contact from "../page/contactus/ContactUs";
import Error from "../page/error/Error";
import Room from "../page/room/Room";

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
        path: '*',
        element: <Layout><Error/></Layout>
    },
]