import Layout from "../layout/Layout";
import About from "../page/aboutus/About";
import Contact from "../page/contactus/ContactUs";
import Error from "../page/error/Error";

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
        path: '*',
        element: <Layout><Error/></Layout>
    },
]