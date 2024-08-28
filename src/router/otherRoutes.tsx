import Layout from "../layout/Layout";
import About from "../page/aboutus/About";
import Contact from "../page/contactus/ContactUs";

export const otherRoutes = [
    {
        path: '/about',
        element: <Layout><About/></Layout>
    },
    {
        path: '/contact',
        element: <Layout><Contact/></Layout>
    },
]