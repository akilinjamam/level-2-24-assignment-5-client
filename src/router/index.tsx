import { createBrowserRouter } from "react-router-dom";

import { homeRoutes } from "./homeRoutes";
import { otherRoutes } from "./otherRoutes";
import { authenticationRoute } from "./authenticationRoute";

export const router = createBrowserRouter([
  ...homeRoutes,
  ...otherRoutes,
  ...authenticationRoute
]);
