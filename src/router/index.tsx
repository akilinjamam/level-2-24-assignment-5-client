import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/home/Home";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home/></Layout>
  }
]);
