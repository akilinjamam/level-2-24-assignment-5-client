import { createBrowserRouter } from "react-router-dom";

import { homeRoutes } from "./homeRoutes";
import { otherRoutes } from "./otherRoutes";

export const router = createBrowserRouter([
  ...homeRoutes,
  ...otherRoutes
]);
