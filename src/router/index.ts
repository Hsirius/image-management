import React from "react";

export interface RoutesProps {
  path: string;
  component: any;
  exact?: boolean;
  routes?: Array<any>;
}

const routes = [
  {
    path: "/",
    exact: true,
    component: React.lazy(() => import("../pages/Home")),
  },
  {
    path: "/login",
    component: React.lazy(() => import("../pages/Login")),
  },
  {
    path: "/upload",
    component: React.lazy(() => import("../pages/Upload")),
  },
];

export default routes;
