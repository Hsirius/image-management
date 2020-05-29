import React from "react";

export interface RoutesProps {
  path: string;
  component: any;
  exact?: boolean;
  hideHeader?: boolean;
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
    hideHeader: true,
    component: React.lazy(() => import("../pages/Login")),
  },
  {
    path: "/detail/:imgId",
    component: React.lazy(() => import("../pages/Home/imgDetail")),
  },
  {
    path: "/upload",
    component: React.lazy(() => import("../pages/Upload")),
  },
];

export default routes;
