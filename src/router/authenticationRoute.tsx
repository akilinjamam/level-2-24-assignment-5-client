import Layout from "../layout/Layout";
import Login from "../page/Login/Login";
import Registration from "../page/Registration/Registration";

export const authenticationRoute = [
    {
        path: '/registration',
        element: <Layout><Registration/></Layout>
    },
    {
        path: '/login',
        element: <Layout><Login/></Layout>
    },
    // {
    //     path: '*',
    //     element: <Layout><Error/></Layout>
    // },
]