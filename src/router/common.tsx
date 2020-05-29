import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { RoutesProps } from "./index";
import Header from "../pages/components/header";

const RouteWithSubRoutes = (route: RoutesProps, index: number) => {
  return (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      render={(props) => (
        <>
          {route.hideHeader ? null : <Header />}
          <Suspense fallback={null}>
            <route.component {...props} routes={route.routes} />
          </Suspense>
        </>
      )}
    />
  );
};

export default RouteWithSubRoutes;
